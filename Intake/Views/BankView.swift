import SwiftUI

struct BankView: View {
    @State private var selectedFilter = "All"
    @State private var expandedItemId: UUID? = nil
    let filters = ["All", "Foods", "Meals", "Brands", "Custom", "Recent"]
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Title + Icons
                HStack {
                    Text("Bank")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                    Spacer()
                    HStack(spacing: 16) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundStyle(.primary)
                        Image(systemName: "line.3.horizontal")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundStyle(.primary)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Search Bar - Glass
                LiquidGlassSearchBar(placeholder: "Search foods, meals, brands, or companies")
                    .padding(.horizontal, 20)
                
                // Filter Chips - Glass
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(filters, id: \.self) { filter in
                            Button(action: { selectedFilter = filter }) {
                                LiquidGlassChip(
                                    text: filter,
                                    icon: nil,
                                    isSelected: selectedFilter == filter,
                                    color: .blue
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 20)
                }
                
                // Food List - Glass cards
                VStack(spacing: 12) {
                    ForEach(FoodItem.mockData) { food in
                        FoodGlassCard(
                            food: food,
                            isExpanded: expandedItemId == food.id
                        ) {
                            withAnimation(.easeInOut(duration: 0.3)) {
                                if expandedItemId == food.id {
                                    expandedItemId = nil
                                } else {
                                    expandedItemId = food.id
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                }
                
                Spacer().frame(height: 40)
            }
        }
        .background(Color(.systemBackground))
    }
}

struct FoodGlassCard: View {
    let food: FoodItem
    let isExpanded: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            Button(action: onTap) {
                HStack(spacing: 14) {
                    // Food emoji with glass container
                    Text(food.imageIcon)
                        .font(.system(size: 36))
                        .frame(width: 56, height: 56)
                        .background(
                            ZStack {
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .fill(.ultraThinMaterial)
                                
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .stroke(.white.opacity(0.2), lineWidth: 1)
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
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(food.name)
                            .font(.system(size: 16, weight: .semibold, design: .rounded))
                            .foregroundStyle(.primary)
                        
                        if food.hasBrand, let brand = food.brand {
                            HStack(spacing: 4) {
                                if let brandIcon = food.brandIcon {
                                    Text(brandIcon)
                                        .font(.system(size: 12))
                                }
                                Text(brand)
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(food.brandColor ?? .secondary)
                            }
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(
                                ZStack {
                                    Capsule()
                                        .fill((food.brandColor ?? .gray).opacity(0.1))
                                    Capsule()
                                        .stroke(.white.opacity(0.15), lineWidth: 0.5)
                                }
                            )
                        }
                    }
                    
                    Spacer()
                    
                    HStack(spacing: 4) {
                        Text("\(food.calories)")
                            .font(.system(size: 16, weight: .bold, design: .rounded))
                            .foregroundStyle(.primary)
                        Text("kcal")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundStyle(.secondary)
                    }
                    
                    Image(systemName: "chevron.right")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(.secondary)
                        .rotationEffect(.degrees(isExpanded ? 90 : 0))
                        .animation(.easeInOut(duration: 0.2), value: isExpanded)
                }
                .padding(14)
            }
            .buttonStyle(.plain)
            .background(
                ZStack {
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .fill(.thinMaterial)
                    
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .stroke(
                            .white.opacity(0.25),
                            lineWidth: 1
                        )
                    
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .stroke(
                            LinearGradient(
                                colors: [.white.opacity(0.35), .white.opacity(0.05), .white.opacity(0.0)],
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
            
            // Expanded detail - Glass
            if isExpanded {
                VStack(spacing: 0) {
                    Divider()
                        .background(.white.opacity(0.12))
                        .padding(.horizontal, 16)
                    
                    HStack(spacing: 0) {
                        GlassMacroDetail(label: "Protein", value: "\(food.protein) g", color: .blue)
                        
                        Divider()
                            .background(.white.opacity(0.12))
                        
                        GlassMacroDetail(label: "Carbs", value: "\(food.carbs) g", color: .green)
                        
                        Divider()
                            .background(.white.opacity(0.12))
                        
                        GlassMacroDetail(label: "Fat", value: "\(food.fat) g", color: .orange)
                        
                        Divider()
                            .background(.white.opacity(0.12))
                        
                        GlassMacroDetail(label: "Fiber", value: "\(food.fiber) g", color: .purple)
                    }
                    .padding(.vertical, 14)
                    .padding(.horizontal, 14)
                }
                .background(
                    ZStack {
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .fill(.thinMaterial)
                        
                        RoundedRectangle(cornerRadius: 20, style: .continuous)
                            .stroke(.white.opacity(0.2), lineWidth: 1)
                    }
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [.white.opacity(0.08), .white.opacity(0.0)],
                                startPoint: .top,
                                endPoint: .center
                            )
                        )
                        .allowsHitTesting(false)
                )
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
    }
}

struct GlassMacroDetail: View {
    let label: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 4) {
            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundStyle(.secondary)
            Text(value)
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .foregroundStyle(.primary)
            Text("\(Int.random(in: 10...30))%")
                .font(.system(size: 11, weight: .medium))
                .foregroundStyle(color)
        }
        .frame(maxWidth: .infinity)
    }
}

#Preview {
    BankView()
}
