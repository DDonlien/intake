import SwiftUI

// MARK: - Liquid Glass Material System
// iOS 26 Liquid Glass: translucent material that reflects and refracts surroundings
// with dynamic specular highlights, edge refraction, and depth

struct LiquidGlassCard<Content: View>: View {
    let content: Content
    let cornerRadius: CGFloat
    let thickness: GlassThickness
    let hasDepth: Bool
    
    enum GlassThickness {
        case thin      // For small elements like chips
        case standard  // For cards
        case thick     // For primary containers
    }
    
    init(
        cornerRadius: CGFloat = 24,
        thickness: GlassThickness = .standard,
        hasDepth: Bool = true,
        @ViewBuilder content: () -> Content
    ) {
        self.cornerRadius = cornerRadius
        self.thickness = thickness
        self.hasDepth = hasDepth
        self.content = content()
    }
    
    var material: Material {
        switch thickness {
        case .thin: return .ultraThinMaterial
        case .standard: return .thinMaterial
        case .thick: return .regularMaterial
        }
    }
    
    var body: some View {
        content
            .padding(thickness == .thin ? 10 : 18)
            .background(
                ZStack {
                    // Base glass material
                    RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                        .fill(material)
                    
                    // Inner refraction glow - subtle light passing through
                    RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                        .stroke(
                            .white.opacity(0.08),
                            lineWidth: 1.5
                        )
                    
                    // Edge specular highlight - the bright reflection along edges
                    RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                        .stroke(
                            LinearGradient(
                                colors: [
                                    .white.opacity(0.35),
                                    .white.opacity(0.05),
                                    .white.opacity(0.0),
                                    .white.opacity(0.02),
                                    .white.opacity(0.25)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 1.2
                        )
                }
            )
            .overlay(
                // Top surface reflection - specular highlight
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(
                        LinearGradient(
                            colors: [
                                .white.opacity(0.18),
                                .white.opacity(0.04),
                                .white.opacity(0.0),
                                .white.opacity(0.0),
                                .white.opacity(0.06)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .allowsHitTesting(false)
            )
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .shadow(
                color: .black.opacity(hasDepth ? 0.12 : 0.06),
                radius: hasDepth ? 16 : 8,
                x: 0,
                y: hasDepth ? 8 : 4
            )
    }
}

// MARK: - Liquid Glass Button / Pill
struct LiquidGlassButton<Label: View>: View {
    let action: () -> Void
    let label: Label
    let isProminent: Bool
    
    init(
        isProminent: Bool = false,
        action: @escaping () -> Void,
        @ViewBuilder label: () -> Label
    ) {
        self.isProminent = isProminent
        self.action = action
        self.label = label()
    }
    
    var body: some View {
        Button(action: action) {
            label
                .padding(.horizontal, 20)
                .padding(.vertical, 12)
                .background(
                    ZStack {
                        Capsule()
                            .fill(isProminent ? Color.white.opacity(0.25) : .ultraThinMaterial)
                        
                        // Specular edge
                        Capsule()
                            .stroke(
                                LinearGradient(
                                    colors: [.white.opacity(0.4), .white.opacity(0.1), .white.opacity(0.0)],
                                    startPoint: .topLeading,
                                    endPoint: .bottom
                                ),
                                lineWidth: 1
                            )
                    }
                )
                .overlay(
                    Capsule()
                        .fill(
                            LinearGradient(
                                colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                startPoint: .top,
                                endPoint: .center
                            )
                        )
                        .allowsHitTesting(false)
                )
                .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Liquid Glass Circle Button (for Record tab)
struct LiquidGlassCircleButton<Content: View>: View {
    let size: CGFloat
    let content: Content
    let action: () -> Void
    
    init(size: CGFloat = 56, action: @escaping () -> Void, @ViewBuilder content: () -> Content) {
        self.size = size
        self.action = action
        self.content = content()
    }
    
    var body: some View {
        Button(action: action) {
            content
                .frame(width: size, height: size)
                .background(
                    ZStack {
                        Circle()
                            .fill(.regularMaterial)
                        
                        // Thick glass refraction
                        Circle()
                            .stroke(
                                .white.opacity(0.3),
                                lineWidth: 1.5
                            )
                        
                        // Specular highlight at top
                        Circle()
                            .stroke(
                                AngularGradient(
                                    colors: [
                                        .white.opacity(0.5),
                                        .white.opacity(0.1),
                                        .white.opacity(0.0),
                                        .white.opacity(0.0),
                                        .white.opacity(0.3)
                                    ],
                                    center: .center,
                                    angle: .degrees(45)
                                ),
                                lineWidth: 2
                            )
                    }
                )
                .overlay(
                    Circle()
                        .fill(
                            RadialGradient(
                                colors: [.white.opacity(0.2), .white.opacity(0.0)],
                                center: .topLeading,
                                startRadius: 0,
                                endRadius: size * 0.8
                            )
                        )
                        .allowsHitTesting(false)
                )
                .shadow(color: .black.opacity(0.15), radius: 12, x: 0, y: 6)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Liquid Glass Chip
struct LiquidGlassChip: View {
    let text: String
    let icon: String?
    let isSelected: Bool
    let color: Color
    
    var body: some View {
        HStack(spacing: 6) {
            if let icon = icon {
                Image(systemName: icon)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(isSelected ? .white : color)
            }
            Text(text)
                .font(.system(size: 13, weight: isSelected ? .semibold : .medium, design: .rounded))
                .foregroundStyle(isSelected ? .white : .primary)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 8)
        .background(
            ZStack {
                Capsule()
                    .fill(isSelected ? color.opacity(0.85) : .ultraThinMaterial)
                
                if !isSelected {
                    Capsule()
                        .stroke(
                            .white.opacity(0.25),
                            lineWidth: 1
                        )
                }
            }
        )
        .overlay(
            Capsule()
                .fill(
                    LinearGradient(
                        colors: [.white.opacity(isSelected ? 0.2 : 0.12), .white.opacity(0.0)],
                        startPoint: .top,
                        endPoint: .center
                    )
                )
                .allowsHitTesting(false)
        )
    }
}

// MARK: - Liquid Glass Search Bar
struct LiquidGlassSearchBar: View {
    let placeholder: String
    
    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 16, weight: .medium))
                .foregroundStyle(.secondary)
            
            Text(placeholder)
                .font(.system(size: 16, weight: .regular))
                .foregroundStyle(.secondary)
            
            Spacer()
        }
        .padding(14)
        .background(
            ZStack {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.ultraThinMaterial)
                
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(
                        LinearGradient(
                            colors: [.white.opacity(0.3), .white.opacity(0.08)],
                            startPoint: .topLeading,
                            endPoint: .bottom
                        ),
                        lineWidth: 1
                    )
            }
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [.white.opacity(0.1), .white.opacity(0.0)],
                        startPoint: .top,
                        endPoint: .center
                    )
                )
                .allowsHitTesting(false)
        )
    }
}

// MARK: - Liquid Glass List Row
struct LiquidGlassListRow<Leading: View, Trailing: View>: View {
    let leading: Leading
    let trailing: Trailing
    let action: () -> Void
    
    init(action: @escaping () -> Void, @ViewBuilder leading: () -> Leading, @ViewBuilder trailing: () -> Trailing) {
        self.action = action
        self.leading = leading()
        self.trailing = trailing()
    }
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 14) {
                leading
                Spacer()
                trailing
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 4)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Energy Ring with Glass Aesthetic
struct GlassEnergyRing: View {
    let progress: Double
    let size: CGFloat
    let lineWidth: CGFloat
    let color: Color
    
    var body: some View {
        ZStack {
            // Background ring with glass texture
            Circle()
                .stroke(
                    .ultraThinMaterial,
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
            
            // Glass-filled progress ring with specular effect
            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    AngularGradient(
                        colors: [
                            color.opacity(0.6),
                            color,
                            color.opacity(0.8),
                            color.opacity(0.5)
                        ],
                        center: .center,
                        startAngle: .degrees(0),
                        endAngle: .degrees(360)
                    ),
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.2), value: progress)
            
            // Specular highlight on the ring
            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    .white.opacity(0.3),
                    style: StrokeStyle(lineWidth: lineWidth * 0.3, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.2), value: progress)
                .blur(radius: 2)
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Glass Progress Bar
struct GlassProgressBar: View {
    let progress: Double
    let color: Color
    let height: CGFloat
    
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                // Track - glass background
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(.ultraThinMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                            .stroke(.white.opacity(0.15), lineWidth: 0.8)
                    )
                
                // Fill - glass material with gradient
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(
                        LinearGradient(
                            colors: [color.opacity(0.8), color.opacity(0.6)],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                            .fill(
                                LinearGradient(
                                    colors: [.white.opacity(0.25), .white.opacity(0.0)],
                                    startPoint: .top,
                                    endPoint: .bottom
                                )
                            )
                    )
                    .frame(width: max(0, geo.size.width * progress), height: height)
                    .animation(.easeInOut(duration: 0.8), value: progress)
                
                // Specular highlight on top of fill
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(.white.opacity(0.2))
                    .frame(width: max(0, geo.size.width * progress), height: height * 0.4)
                    .animation(.easeInOut(duration: 0.8), value: progress)
                    .allowsHitTesting(false)
            }
        }
        .frame(height: height)
    }
}

// MARK: - Glass Icon Container
struct GlassIconContainer: View {
    let icon: String
    let color: Color
    let size: CGFloat
    
    var body: some View {
        Image(systemName: icon)
            .font(.system(size: size * 0.45, weight: .semibold))
            .foregroundStyle(color)
            .frame(width: size, height: size)
            .background(
                ZStack {
                    Circle()
                        .fill(.ultraThinMaterial)
                    Circle()
                        .stroke(
                            .white.opacity(0.25),
                            lineWidth: 1
                        )
                }
            )
            .overlay(
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [.white.opacity(0.15), .white.opacity(0.0)],
                            center: .topLeading,
                            startRadius: 0,
                            endRadius: size * 0.6
                        )
                    )
                    .allowsHitTesting(false)
            )
    }
}

// MARK: - Glass Section Header
struct GlassSectionHeader: View {
    let title: String
    let icon: String?
    let action: (() -> Void)?
    
    var body: some View {
        HStack {
            HStack(spacing: 6) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(.secondary)
                }
                Text(title)
                    .font(.system(size: 18, weight: .bold, design: .rounded))
                    .foregroundStyle(.primary)
            }
            
            Spacer()
            
            if let action = action {
                Button(action: action) {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
            }
        }
    }
}
