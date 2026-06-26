import SwiftUI
import UIKit
import AVFoundation

// MARK: - Camera permission

enum CameraPermission {
    case authorized
    case denied
    case restricted
    case unsupported

    @MainActor
    static var current: CameraPermission {
        guard UIImagePickerController.isSourceTypeAvailable(.camera) else { return .unsupported }
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized: return .authorized
        case .denied: return .denied
        case .restricted: return .restricted
        case .notDetermined: return .denied // trigger request flow
        @unknown default: return .denied
        }
    }

    @MainActor
    static func request() async -> CameraPermission {
        guard UIImagePickerController.isSourceTypeAvailable(.camera) else { return .unsupported }
        let status = await AVCaptureDevice.requestAccess(for: .video)
        return status ? .authorized : .denied
    }
}

// MARK: - Camera capture (UIImagePickerController bridge)

struct CameraCaptureSheet: UIViewControllerRepresentable {
    let onResult: (UIImage?) -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.cameraCaptureMode = .photo
        picker.allowsEditing = false
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator { Coordinator(onResult: onResult) }

    final class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let onResult: (UIImage?) -> Void
        init(onResult: @escaping (UIImage?) -> Void) { self.onResult = onResult }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            picker.dismiss(animated: true) { [onResult] in
                onResult(info[.originalImage] as? UIImage)
            }
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            picker.dismiss(animated: true) { [onResult] in
                onResult(nil)
            }
        }
    }
}
