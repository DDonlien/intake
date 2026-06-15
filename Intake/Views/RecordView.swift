import SwiftUI

struct RecordView: View {
    @State private var selectedMeal = "Lunch"
    @State private var autoFill = true
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Top Bar
                HStack {
                    Button(action: {}) {
                        Image(systemName: "xmark")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundColor(.primary)
                            .frame(width: 36, height: 36)
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                                    .overlay(
                                        Circle()
                                            .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                    )
                            )
                    }
                    .buttonStyle(PlainButtonStyle())
                    
                    Spacer()
                    
                    // Meal Selector
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
                                .font(.system(size: 15, weight: .semibold))
                            Image(systemName: "chevron.down")
                                .font(.system(size: 12))
                        }
                        .foregroundColor(.primary)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 8)
                        .background(
                            Capsule()
                                .fill(.ultraThinMaterial)
                                .overlay(
                                    Capsule()
                                        .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                )
                        )
                    }
                    
                    Spacer()
                    
                    Button(action: {}) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundColor(.primary)
                            .frame(width: 36, height: 36)
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                                    .overlay(
                                        Circle()
                                            .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                    )
                            )
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Auto-fill Toggle
                HStack(spacing: 10) {
                    Image(systemName: "sparkles")
                        .font(.system(size: 16))
                        .foregroundColor(.purple)
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Auto-fill")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.primary)
                        Text("Detect foods & log instantly")
                            .font(.system(size: 12, weight: .regular))
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    Toggle("", isOn: $autoFill)
                        .toggleStyle(SwitchToggleStyle(tint: .purple))
                        .frame(width: 50)
                }
                .padding(12)
                .background(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .fill(.ultraThinMaterial)
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                        )
                )
                .padding(.horizontal, 20)
                
                // Camera / Photo Area
                ZStack {
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color.purple.opacity(0.1),
                                    Color.orange.opacity(0.1),
                                    Color.yellow.opacity(0.05)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 24, style: .continuous)
                                .stroke(Color.white.opacity(0.2), lineWidth: 1)
                        )
                    
                    VStack(spacing: 20) {
                        // Food illustration placeholder
                        HStack(spacing: -10) {
                            ForEach(["🍗", "🍔", "🥗", "🍎", "🥑"], id: \.self) { emoji in
                                Text(emoji)
                                    .font(.system(size: 40))
                                    .frame(width: 64, height: 64)
                                    .background(
                                        Circle()
                                            .fill(.ultraThinMaterial)
                                            .overlay(
                                                Circle()
                                                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                            )
                                    )
                            }
                        }
                        
                        Text("Point camera at your meal")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(.secondary)
                        
                        // Bottom camera actions
                        HStack(spacing: 40) {
                            VStack(spacing: 6) {
                                Image(systemName: "photo.on.rectangle")
                                    .font(.system(size: 24))
                                    .foregroundColor(.primary)
                                    .frame(width: 56, height: 56)
                                    .background(
                                        Circle()
                                            .fill(.ultraThinMaterial)
                                            .overlay(
                                                Circle()
                                                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                            )
                                    )
                                Text("Library")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                            }
                            
                            Button(action: {}) {
                                ZStack {
                                    Circle()
                                        .fill(.ultraThinMaterial)
                                        .frame(width: 72, height: 72)
                                        .overlay(
                                            Circle()
                                                .stroke(Color.white.opacity(0.3), lineWidth: 2)
                                        )
                                    
                                    Circle()
                                        .fill(.white)
                                        .frame(width: 60, height: 60)
                                    
                                    Image(systemName: "camera.fill")
                                        .font(.system(size: 24, weight: .medium))
                                        .foregroundColor(.primary)
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            VStack(spacing: 6) {
                                Image(systemName: "mic.fill")
                                    .font(.system(size: 24))
                                    .foregroundColor(.primary)
                                    .frame(width: 56, height: 56)
                                    .background(
                                        Circle()
                                            .fill(.ultraThinMaterial)
                                            .overlay(
                                                Circle()
                                                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                            )
                                    )
                                Text("Voice")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding(.vertical, 30)
                }
                .frame(height: 320)
                .padding(.horizontal, 20)
                
                // Search Bar
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.secondary)
                    
                    Text("Search foods, brands, or meals")
                        .font(.system(size: 16, weight: .regular))
                        .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    Image(systemName: "barcode.viewfinder")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
                .padding(14)
                .background(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .fill(.ultraThinMaterial)
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                        )
                )
                .padding(.horizontal, 20)
                
                // Quick Actions
                HStack(spacing: 0) {
                    ForEach(QuickAction.mockData) { action in
                        VStack(spacing: 8) {
                            Image(systemName: action.icon)
                                .font(.system(size: 22))
                                .foregroundColor(action.color)
                                .frame(width: 48, height: 48)
                                .background(
                                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                                        .fill(.ultraThinMaterial)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                        )
                                )
                            
                            Text(action.name)
                                .font(.system(size: 12, weight: .medium))
                                .foregroundColor(.primary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding(.horizontal, 20)
                
                // Recent Foods
                VStack(alignment: .leading, spacing: 14) {
                    HStack {
                        Text("Recent Foods")
                            .font(.system(size: 18, weight: .bold, design: .rounded))
                            .foregroundColor(.primary)
                        Spacer()
                        Button(action: {}) {
                            Text("View all")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(.purple)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                    
                    ForEach(RecentFood.mockData) { food in
                        Button(action: {}) {
                            HStack(spacing: 14) {
                                Text(food.icon)
                                    .font(.system(size: 32))
                                    .frame(width: 48, height: 48)
                                    .background(
                                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                                            .fill(.ultraThinMaterial)
                                    )
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(food.name)
                                        .font(.system(size: 16, weight: .semibold))
                                        .foregroundColor(.primary)
                                    Text(food.detail)
                                        .font(.system(size: 13, weight: .regular))
                                        .foregroundColor(.secondary)
                                        .lineLimit(1)
                                }
                                
                                Spacer()
                                
                                HStack(spacing: 4) {
                                    Text("\(food.calories)")
                                        .font(.system(size: 16, weight: .bold, design: .rounded))
                                        .foregroundColor(.primary)
                                    Text("kcal")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundColor(.secondary)
                                }
                                
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundColor(.secondary)
                            }
                            .padding(.vertical, 8)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(.thinMaterial)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                        )
                )
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
