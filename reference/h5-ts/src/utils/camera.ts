export class CameraService {
  private stream: MediaStream | null = null;
  private videoEl: HTMLVideoElement | null = null;
  private container: HTMLElement | null = null;

  get isActive(): boolean {
    return this.stream !== null && this.stream.active;
  }

  async start(container: HTMLElement): Promise<void> {
    this.container = container;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      this.videoEl = document.createElement('video');
      this.videoEl.autoplay = true;
      this.videoEl.playsInline = true;
      this.videoEl.muted = true;
      this.videoEl.srcObject = this.stream;
      this.videoEl.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;border-radius:inherit;';

      container.appendChild(this.videoEl);
    } catch (err) {
      console.error('Camera access failed:', err);
      this.showFallback();
      throw err;
    }
  }

  stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this.videoEl && this.videoEl.parentNode) {
      this.videoEl.parentNode.removeChild(this.videoEl);
      this.videoEl = null;
    }
  }

  capture(): string | null {
    if (!this.videoEl || !this.videoEl.videoWidth) return null;

    const canvas = document.createElement('canvas');
    canvas.width = this.videoEl.videoWidth;
    canvas.height = this.videoEl.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(this.videoEl, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  private showFallback(): void {
    if (!this.container) return;
    const fallback = document.createElement('div');
    fallback.className = 'camera-fallback';
    fallback.textContent = '相机不可用，请使用相册或手动输入';
    fallback.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;color:white;font-size:14px;background:rgba(0,0,0,.5);z-index:2;padding:20px;text-align:center;';
    this.container.appendChild(fallback);
  }
}
