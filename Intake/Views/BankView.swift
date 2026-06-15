import SwiftUI

struct BankView: View {
    @State private var selectedFilter = "All"
    @State private var expandedItemId: UUID? = nil
    let filters = ["All", "Foods", "Meals", "Brands", "Custom", "Recent"]
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Title + Search icons
                HStack {
                    Text("Bank")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                    Spacer()
                    HStack(spacing: 16) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundColor(.primary)
                        Image(systemName: "line.3.horizontal")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundColor(.primary)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Search Bar
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.secondary)
                    
                    Text("Search foods, meals, brands, or companies")
                        .font(.system(size: 16, weight: .regular))
                        .foregroundColor(.secondary)
                    
                    Spacer()
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
                
                // Filter Chips
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(filters, id: \.self) { filter in
                            Button(action: { selectedFilter = filter }) {
                                Text(filter)
                                    .font(.system(size: 14, weight: selectedFilter == filter ? .semibold : .medium))
                                    .foregroundColor(selectedFilter == filter ? .white : .primary)
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 8)
                                    .background(
                                        Capsule()
                                            .fill(selectedFilter == filter ? Color.blue.opacity(0.8) : .ultraThinMaterial)
                                            .overlay(
                                                Capsule()
                                                    .stroke(Color.white.opacity(0.12), lineWidth: 0.5)
                                            )
                                    )
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                    .padding(.horizontal, 20)
                }
                
                // Food List
                VStack(spacing: 12) {
                    ForEach(FoodItem.mockData) { food in
                        FoodListCard(
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

struct FoodListCard: View {
    let food: FoodItem
    let isExpanded: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            Button(action: onTap) {
                HStack(spacing: 14) {
                    // Food Icon / Image placeholder
                    Text(food.imageIcon)
                        .font(.system(size: 36))
                        .frame(width: 52, height: 52)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(.ultraThinMaterial)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                                        .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                )
                        )
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(food.name)
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(.primary)
                        
                        if food.hasBrand, let brand = food.brand {
                            HStack(spacing: 4) {
                                if let brandIcon = food.brandIcon {
                                    Text(brandIcon)
                                        .font(.system(size: 12))
                                }
                                Text(brand)
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(food.brandColor ?? .secondary)
                            }
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(
                                Capsule()
                                    .fill((food.brandColor ?? .gray).opacity(0.1))
                            )
                        }
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
                        .rotationEffect(.degrees(isExpanded ? 90 : 0))
                        .animation(.easeInOut(duration: 0.2), value: isExpanded)
                }
                .padding(14)
            }
            .buttonStyle(PlainButtonStyle())
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.thinMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .stroke(Color.white.opacity(0.15), lineWidth: 1)
                    )
            )
            
            // Expanded detail
            if isExpanded {
                VStack(spacing: 0) {
                    Divider()
                        .background(Color.white.opacity(0.08))
                        .padding(.horizontal, 14)
                    
                    HStack(spacing: 0) {
                        MacroDetailItem(
                            label: "Protein",
                            value: "\(food.protein) g",
                            percentage: "\(food.protein * 4 * 100 / max(food.calories, 1))%",
                            color: .blue
                        )
                        
                        Divider()
                            .background(Color.white.opacity(0.08))
                        
                        MacroDetailItem(
                            label: "Carbs",
                            value: "\(food.carbs) g",
                            percentage: "\(food.carbs * 4 * 100 / max(food.calories, 1))%",
                            color: .green
                        )
                        
                        Divider()
                            .background(Color.white.opacity(0.08))
                        
                        MacroDetailItem(
                            label: "Fat",
                            value: "\(food.fat) g",
                            percentage: "\(food.fat * 9 * 100 / max(food.calories, 1))%",
                            color: .orange
                        )
                        
                        Divider()
                            .background(Color.white.opacity(0.08))
                        
                        MacroDetailItem(
                            label: "Fiber",
                            value: "\(food.fiber) g",
                            percentage: "\(food.fiber * 100 / max(food.carbs, 1))%",
                            color: .purple
                        )
                    }
                    .padding(.vertical, 12)
                    .padding(.horizontal, 14)
                }
                .background(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(.thinMaterial)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                        )
                )
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
    }
}

struct MacroDetailItem: View {
    let label: String
    let value: String
    let percentage: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 4) {
            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(.secondary)
            Text(value)
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .foregroundColor(.primary)
            Text(percentage)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity)
    }
}

#Preview {
    BankView()
}
