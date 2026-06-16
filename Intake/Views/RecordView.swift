import SwiftUI

struct RecordView: View {
    @State private var selectedMeal = "Lunch"
    @State private var autoFill = true
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Top Bar - Glass buttons
                HStack {
                    Button(action: {}) {
                        Image(systemName: "xmark")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(.primary)
                            .frame(width: 40, height: 40)
                            .background(
                                ZStack {
                                    Circle()
                                        .fill(.ultraThinMaterial)
                                    Circle()
                                        .stroke(.white.opacity(0.25), lineWidth: 1)
                                }
                            )
                            .overlay(
                                Circle()
                                    .fill(
                                        RadialGradient(
                                            colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                            center: .topLeading,
                                            startRadius: 0,
                                            endRadius: 25
                                        )
                                    )
                                    .allowsHitTesting(false)
                            )
                    }
                    .buttonStyle(.plain)
                    
                    Spacer()
                    
                    // Meal Selector - Glass pill
                    Menu {
                        ForEach(meals, id: \.self) { meal in
                            Button(meal) {
                                selectedMeal = meal
                            }
                        }
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: "fork.knife")
                                .font(.system(size: 14))
                            Text(selectedMeal)
                                .font(.system(size: 15, weight: .semibold, design: .rounded))
                            Image(systemName: "chevron.down")
                                .font(.system(size: 12))
                        }
                        .foregroundStyle(.primary)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(
                            ZStack {
                                Capsule()
                                    .fill(.ultraThinMaterial)
                                Capsule()
                                    .stroke(.white.opacity(0.25), lineWidth: 1)
                                Capsule()
                                    .stroke(
                                        LinearGradient(
                                            colors: [.white.opacity(0.35), .white.opacity(0.05)],
                                            startPoint: .topLeading,
                                            endPoint: .bottom
                                        ),
                                        lineWidth: 1.2
                                    )
                            }
                        )
                        .overlay(
                            Capsule()
                                .fill(
                                    LinearGradient(
                                        colors: [.white.opacity(0.12), .white.opacity(0.0)],
                                        startPoint: .top,
                                        endPoint: .center
                                    )
                                )
                                .allowsHitTesting(false)
                        )
                    }
                    
                    Spacer()
                    
                    Button(action: {}) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(.primary)
                            .frame(width: 40, height: 40)
                            .background(
                                ZStack {
                                    Circle()
                                        .fill(.ultraThinMaterial)
                                    Circle()
                                        .stroke(.white.opacity(0.25), lineWidth: 1)
                                }
                            )
                            .overlay(
                                Circle()
                                    .fill(
                                        RadialGradient(
                                            colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                            center: .topLeading,
                                            startRadius: 0,
                                            endRadius: 25
                                        )
                                    )
                                    .allowsHitTesting(false)
                            )
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Auto-fill Toggle - Glass
                HStack(spacing: 12) {
                    GlassIconContainer(icon: "sparkles", color: .purple, size: 40)
                    
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
                .background(
                    ZStack {
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .fill(.ultraThinMaterial)
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .stroke(.white.opacity(0.25), lineWidth: 1)
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .stroke(
                                LinearGradient(
                                    colors: [.white.opacity(0.35), .white.opacity(0.05)],
                                    startPoint: .topLeading,
                                    endPoint: .bottom
                                ),
                                lineWidth: 1.2
                            )
                    }
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [.white.opacity(0.1), .white.opacity(0.0)],
                                startPoint: .top,
                                endPoint: .center
                            )
                        )
                        .allowsHitTesting(false)
                )
                .padding(.horizontal, 20)
                
                // Camera Area - Glass container with depth
                ZStack {
                    // Deep glass background with refraction colors
                    RoundedRectangle(cornerRadius: 28, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [
                                    .purple.opacity(0.08),
                                    .orange.opacity(0.06),
                                    .yellow.opacity(0.04)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 28, style: .continuous)
                                .stroke(
                                    .white.opacity(0.2),
                                    lineWidth: 1.5
                                )
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 28, style: .continuous)
                                .stroke(
                                    LinearGradient(
                                        colors: [
                                            .white.opacity(0.4),
                                            .white.opacity(0.1),
                                            .white.opacity(0.0),
                                            .white.opacity(0.05),
                                            .white.opacity(0.3)
                                        ],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    ),
                                    lineWidth: 2
                                )
                        )
                    
                    VStack(spacing: 20) {
                        // Food emoji row with glass orbs
                        HStack(spacing: -8) {
                            ForEach(["🍗", "🍔", "🥗", "🍎", "🥑"], id: \.self) { emoji in
                                Text(emoji)
                                    .font(.system(size: 36))
                                    .frame(width: 60, height: 60)
                                    .background(
                                        ZStack {
                                            Circle()
                                                .fill(.ultraThinMaterial)
                                            Circle()
                                                .stroke(.white.opacity(0.25), lineWidth: 1)
                                            Circle()
                                                .stroke(
                                                    AngularGradient(
                                                        colors: [.white.opacity(0.4), .white.opacity(0.1), .white.opacity(0.0)],
                                                        center: .center,
                                                        angle: .degrees(45)
                                                    ),
                                                    lineWidth: 1.5
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
                                                    endRadius: 35
                                                )
                                            )
                                            .allowsHitTesting(false)
                                    )
                            }
                        }
                        
                        Text("Point camera at your meal")
                            .font(.system(size: 15, weight: .medium, design: .rounded))
                            .foregroundStyle(.secondary)
                        
                        // Camera actions - Glass buttons
                        HStack(spacing: 40) {
                            VStack(spacing: 6) {
                                ZStack {
                                    Circle()
                                        .fill(.ultraThinMaterial)
                                        .frame(width: 60, height: 60)
                                    Circle()
                                        .stroke(.white.opacity(0.25), lineWidth: 1)
                                        .frame(width: 60, height: 60)
                                    Image(systemName: "photo.on.rectangle")
                                        .font(.system(size: 22))
                                        .foregroundStyle(.primary)
                                }
                                .overlay(
                                    Circle()
                                        .fill(
                                            RadialGradient(
                                                colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                                center: .topLeading,
                                                startRadius: 0,
                                                endRadius: 30
                                            )
                                        )
                                        .allowsHitTesting(false)
                                )
                                Text("Library")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                            }
                            
                            // Shutter button - prominent glass
                            Button(action: {}) {
                                ZStack {
                                    Circle()
                                        .fill(.regularMaterial)
                                        .frame(width: 72, height: 72)
                                    Circle()
                                        .stroke(.white.opacity(0.3), lineWidth: 2)
                                        .frame(width: 72, height: 72)
                                    Circle()
                                        .stroke(
                                            AngularGradient(
                                                colors: [.white.opacity(0.5), .white.opacity(0.1), .white.opacity(0.2)],
                                                center: .center,
                                                angle: .degrees(45)
                                            ),
                                            lineWidth: 2.5
                                        )
                                        .frame(width: 72, height: 72)
                                    
                                    Circle()
                                        .fill(.white)
                                        .frame(width: 58, height: 58)
                                        .shadow(color: .black.opacity(0.08), radius: 4, x: 0, y: 2)
                                    
                                    Image(systemName: "camera.fill")
                                        .font(.system(size: 24, weight: .medium))
                                        .foregroundStyle(.primary)
                                }
                                .overlay(
                                    Circle()
                                        .fill(
                                            RadialGradient(
                                                colors: [.white.opacity(0.3), .white.opacity(0.0)],
                                                center: .topLeading,
                                                startRadius: 0,
                                                endRadius: 40
                                            )
                                        )
                                        .allowsHitTesting(false)
                                )
                            }
                            .buttonStyle(.plain)
                            
                            VStack(spacing: 6) {
                                ZStack {
                                    Circle()
                                        .fill(.ultraThinMaterial)
                                        .frame(width: 60, height: 60)
                                    Circle()
                                        .stroke(.white.opacity(0.25), lineWidth: 1)
                                        .frame(width: 60, height: 60)
                                    Image(systemName: "mic.fill")
                                        .font(.system(size: 22))
                                        .foregroundStyle(.primary)
                                }
                                .overlay(
                                    Circle()
                                        .fill(
                                            RadialGradient(
                                                colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                                center: .topLeading,
                                                startRadius: 0,
                                                endRadius: 30
                                            )
                                        )
                                        .allowsHitTesting(false)
                                )
                                Text("Voice")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                    .padding(.vertical, 30)
                }
                .frame(height: 300)
                .padding(.horizontal, 20)
                
                // Search Bar - Glass
                LiquidGlassSearchBar(placeholder: "Search foods, brands, or meals")
                    .padding(.horizontal, 20)
                
                // Quick Actions - Glass icons
                HStack(spacing: 0) {
                    ForEach(QuickAction.mockData) { action in
                        VStack(spacing: 8) {
                            ZStack {
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .fill(.ultraThinMaterial)
                                    .frame(width: 52, height: 52)
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .stroke(.white.opacity(0.25), lineWidth: 1)
                                    .frame(width: 52, height: 52)
                                Image(systemName: action.icon)
                                    .font(.system(size: 22))
                                    .foregroundStyle(action.color)
                            }
                            .overlay(
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .fill(
                                        RadialGradient(
                                            colors: [.white.opacity(0.15), .white.opacity(0.0)],
                                            center: .topLeading,
                                            startRadius: 0,
                                            endRadius: 30
                                        )
                                    )
                                    .allowsHitTesting(false)
                            )
                            
                            Text(action.name)
                                .font(.system(size: 12, weight: .medium))
                                .foregroundStyle(.primary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding(.horizontal, 20)
                
                // Recent Foods - Glass card
                LiquidGlassCard(cornerRadius: 24, thickness: .standard) {
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
                            .buttonStyle(.plain)
                        }
                        
                        ForEach(RecentFood.mockData) { food in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    Text(food.icon)
                                        .font(.system(size: 32))
                                        .frame(width: 48, height: 48)
                                        .background(
                                            ZStack {
                                                RoundedRectangle(cornerRadius: 14, style: .continuous)
                                                    .fill(.ultraThinMaterial)
                                                RoundedRectangle(cornerRadius: 14, style: .continuous)
                                                    .stroke(.white.opacity(0.2), lineWidth: 1)
                                            }
                                        )
                                    
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
                            .buttonStyle(.plain)
                            
                            if food.id != RecentFood.mockData.last?.id {
                                Divider()
                                    .background(.white.opacity(0.08))
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                Spacer().frame(height: 40)
            }
        }
        .background(Color(.systemBackground))
    }
}

#Preview {
    RecordView()
}
