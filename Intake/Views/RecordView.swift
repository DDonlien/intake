import SwiftUI
import PhotosUI

struct RecordView: View {
    @State private var selectedMeal = "Lunch"
    @State private var autoFill = true
    @State private var capturedImage: UIImage?
    @State private var showingCamera = false
    @State private var photoPickerItem: PhotosPickerItem?
    @State private var permissionAlert: CameraPermissionAlert?
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                topBar
                autoFillCard
                cameraArea
                searchBar
                quickActions
                recentFoods
                Spacer().frame(height: 40)
            }
        }
        #if os(iOS)
        .background(Color(.systemBackground))
        #else
        .background(Color(.windowBackgroundColor))
        #endif
        .fullScreenCover(isPresented: $showingCamera) {
            CameraCaptureSheet { result in
                showingCamera = false
                if let image = result {
                    capturedImage = image
                }
            }
            .ignoresSafeArea()
        }
        .alert(item: $permissionAlert) { alert in
            Alert(
                title: Text(alert.title),
                message: Text(alert.message),
                primaryButton: .default(Text("Settings"), action: openSettings),
                secondaryButton: .cancel()
            )
        }
    }

    // MARK: - Sub-views

    private var topBar: some View {
        HStack {
            Button(action: {}) {
                Image(systemName: "xmark")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(.primary)
            }
            .buttonStyle(.glass)

            Spacer()

            Menu {
                ForEach(meals, id: \.self) { meal in
                    Button(meal) { selectedMeal = meal }
                }
            } label: {
                HStack(spacing: 6) {
                    Image(systemName: "fork.knife").font(.system(size: 14))
                    Text(selectedMeal).font(.system(size: 15, weight: .semibold, design: .rounded))
                    Image(systemName: "chevron.down").font(.system(size: 12))
                }
                .foregroundStyle(.primary)
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .glassEffect(.regular, in: .capsule(style: .continuous))
            }

            Spacer()

            Button(action: {}) {
                Image(systemName: "sparkles")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(.primary)
            }
            .buttonStyle(.glass)
        }
        .padding(.horizontal, 20)
        .padding(.top, 10)
    }

    private var autoFillCard: some View {
        HStack(spacing: 12) {
            Image(systemName: "sparkles")
                .font(.system(size: 16))
                .foregroundStyle(.purple)
                .padding(10)
                .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))

            VStack(alignment: .leading, spacing: 2) {
                Text("Auto-fill")
                    .font(.system(size: 15, weight: .semibold, design: .rounded))
                    .foregroundStyle(.primary)
                Text("Detect foods & log instantly")
                    .font(.system(size: 12, weight: .regular))
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Toggle("", isOn: $autoFill)
                .toggleStyle(SwitchToggleStyle(tint: .purple))
                .frame(width: 52)
        }
        .padding(14)
        .glassEffect(.regular, in: .rect(cornerRadius: 20, style: .continuous))
        .padding(.horizontal, 20)
    }

    @ViewBuilder
    private var cameraArea: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            .purple.opacity(0.12),
                            .orange.opacity(0.08),
                            .yellow.opacity(0.05)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )

            if let image = capturedImage {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
                    .overlay(alignment: .topTrailing) {
                        Button {
                            capturedImage = nil
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 28))
                                .foregroundStyle(.white, .black.opacity(0.5))
                                .padding(12)
                        }
                        .accessibilityLabel("Retake photo")
                    }
            } else {
                VStack(spacing: 20) {
                    HStack(spacing: 8) {
                        ForEach(["🍗", "🍔", "🥗", "🍎", "🥑"], id: \.self) { emoji in
                            Text(emoji)
                                .font(.system(size: 36))
                                .frame(width: 56, height: 56)
                                .glassEffect(.clear, in: .circle)
                        }
                    }

                    Text("Point camera at your meal")
                        .font(.system(size: 15, weight: .medium, design: .rounded))
                        .foregroundStyle(.secondary)

                    captureActions
                }
                .padding(.vertical, 30)
            }
        }
        .frame(height: 300)
        .glassEffect(.regular, in: .rect(cornerRadius: 28, style: .continuous))
        .padding(.horizontal, 20)
    }

    private var captureActions: some View {
        HStack(spacing: 40) {
            PhotosPicker(selection: $photoPickerItem, matching: .images) {
                VStack(spacing: 6) {
                    Image(systemName: "photo.on.rectangle")
                        .font(.system(size: 22))
                        .foregroundStyle(.primary)
                        .frame(width: 56, height: 56)
                        .glassEffect(.regular, in: .circle)
                    Text("Library")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(.secondary)
                }
            }
            .accessibilityLabel("Pick from library")
            .onChange(of: photoPickerItem) { _, newItem in
                guard let newItem else { return }
                Task {
                    if let data = try? await newItem.loadTransferable(type: Data.self),
                       let image = UIImage(data: data) {
                        capturedImage = image
                        photoPickerItem = nil
                    }
                }
            }

            Button {
                Task { await handleCameraTap() }
            } label: {
                ZStack {
                    Circle().fill(.regularMaterial).frame(width: 64, height: 64)
                    Circle().fill(.white).frame(width: 56, height: 56)
                        .shadow(color: .black.opacity(0.08), radius: 4, x: 0, y: 2)
                    Image(systemName: "camera.fill")
                        .font(.system(size: 24, weight: .medium))
                        .foregroundStyle(.primary)
                }
            }
            .buttonStyle(.glassProminent)
            .accessibilityLabel("Take photo")

            Button(action: {}) {
                VStack(spacing: 6) {
                    Image(systemName: "mic.fill")
                        .font(.system(size: 22))
                        .foregroundStyle(.primary)
                        .frame(width: 56, height: 56)
                        .glassEffect(.regular, in: .circle)
                    Text("Voice")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(.secondary)
                }
            }
            .accessibilityLabel("Voice input (coming soon)")
        }
    }

    private var searchBar: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 16, weight: .medium))
                .foregroundStyle(.secondary)
            Text("Search foods, brands, or meals")
                .font(.system(size: 16, weight: .regular))
                .foregroundStyle(.secondary)
            Spacer()
            Image(systemName: "barcode.viewfinder")
                .font(.system(size: 18))
                .foregroundStyle(.secondary)
        }
        .padding(14)
        .glassEffect(.regular, in: .rect(cornerRadius: 16, style: .continuous))
        .padding(.horizontal, 20)
    }

    private var quickActions: some View {
        HStack(spacing: 0) {
            ForEach(QuickAction.mockData) { action in
                VStack(spacing: 8) {
                    Image(systemName: action.icon)
                        .font(.system(size: 22))
                        .foregroundStyle(action.color)
                        .frame(width: 48, height: 48)
                        .glassEffect(.clear, in: .rect(cornerRadius: 14, style: .continuous))
                    Text(action.name)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(.primary)
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.horizontal, 20)
    }

    private var recentFoods: some View {
        GlassEffectContainer(spacing: 0) {
            VStack(spacing: 14) {
                HStack {
                    Text("Recent Foods")
                        .font(.system(size: 18, weight: .bold, design: .rounded))
                        .foregroundStyle(.primary)
                    Spacer()
                    Button(action: {}) {
                        Text("View all")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(.purple)
                    }
                    .buttonStyle(.glass)
                }

                ForEach(RecentFood.mockData) { food in
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Text(food.icon)
                                .font(.system(size: 32))
                                .frame(width: 48, height: 48)
                                .glassEffect(.clear, in: .rect(cornerRadius: 14, style: .continuous))

                            VStack(alignment: .leading, spacing: 2) {
                                Text(food.name)
                                    .font(.system(size: 16, weight: .semibold, design: .rounded))
                                    .foregroundStyle(.primary)
                                Text(food.detail)
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                            }

                            Spacer()

                            HStack(spacing: 4) {
                                Text("\(food.calories)")
                                    .font(.system(size: 15, weight: .bold, design: .rounded))
                                    .foregroundStyle(.primary)
                                Text("kcal")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                            }

                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(.secondary)
                        }
                        .padding(.vertical, 8)
                    }
                    .buttonStyle(.glass)

                    if food.id != RecentFood.mockData.last?.id {
                        Divider().background(.white.opacity(0.08))
                    }
                }
            }
            .padding(18)
            .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
        }
        .padding(.horizontal, 20)
    }

    // MARK: - Camera flow

    private func handleCameraTap() async {
        switch CameraPermission.current {
        case .authorized:
            showingCamera = true
        case .denied, .restricted:
            let status = await CameraPermission.request()
            if status == .authorized {
                showingCamera = true
            } else {
                permissionAlert = CameraPermissionAlert(kind: .denied)
            }
        case .unsupported:
            permissionAlert = CameraPermissionAlert(kind: .unsupported)
        }
    }

    private func openSettings() {
        #if os(iOS)
        if let url = URL(string: UIApplication.openSettingsURLString) {
            UIApplication.shared.open(url)
        }
        #endif
    }
}

struct CameraPermissionAlert: Identifiable {
    enum Kind { case denied, unsupported }
    let id = UUID()
    let kind: Kind
    var title: String { kind == .denied ? "Camera access needed" : "Camera unavailable" }
    var message: String {
        switch kind {
        case .denied:
            return "Intake needs camera access to log your meals. Enable it in Settings to take a photo."
        case .unsupported:
            return "This device has no camera. Try picking a photo from your library instead."
        }
    }
}

#Preview {
    RecordView()
}
