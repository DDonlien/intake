import SwiftUI

struct BankView: View {
    @State private var selectedFilter = "All"
    @State private var expandedItemId: UUID? = nil
    @State private var searchText = ""
    @FocusState private var isSearchFocused: Bool
    let filters = ["All", "Foods", "Meals", "Brands", "Custom", "Recent"]

    var body: some View {
        VStack(spacing: 0) {
            // Main scrollable content (食物列表)
            ScrollView(showsIndicators: false) {
                VStack(spacing: 20) {
                    // Title + Icons
                    HStack {
                        Text("Bank")
                            .font(.system(size: 34, weight: .bold, design: .rounded))
                        Spacer()
                        HStack(spacing: 16) {
                            // 顶部放大镜：直接 focus 底部搜索框，避免重复
                            Button(action: { isSearchFocused = true }) {
                                Image(systemName: "magnifyingglass")
                                    .font(.system(size: 20, weight: .semibold))
                                    .foregroundStyle(.primary)
                            }
                            .buttonStyle(.glass)

                            Button(action: {}) {
                                Image(systemName: "line.3.horizontal")
                                    .font(.system(size: 20, weight: .semibold))
                                    .foregroundStyle(.primary)
                            }
                            .buttonStyle(.glass)
                        }
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 10)

                    // Food List - Glass cards
                    VStack(spacing: 12) {
                        ForEach(filteredFoods) { food in
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

                    // 给底部悬浮控件留出间距，避免最后一张卡贴边
                    Spacer().frame(height: 24)
                }
            }
            // 滚动时交互式收起键盘，避免键盘消失时页面留有 inset 异常
            .scrollDismissesKeyboard(.interactively)

            // 底部悬浮控件：筛选 Tab 在上、搜索框在下，固定在 TabView 上方
            VStack(spacing: 10) {
                // Filter Chips - Glass
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(filters, id: \.self) { filter in
                            Button(action: { selectedFilter = filter }) {
                                Text(filter)
                                    .font(.system(size: 14, weight: selectedFilter == filter ? .semibold : .medium, design: .rounded))
                                    .foregroundStyle(selectedFilter == filter ? .white : .primary)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .glassEffect(
                                        selectedFilter == filter ? .regular.tint(.blue) : .clear,
                                        in: .capsule(style: .continuous)
                                    )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 20)
                }

                // Search Bar - TextField
                // 注意：iOS 在 TextField 字体 < 16pt 时会自动放大整个页面以保证可读性，
                // 这就是“诡异的缩放”，且焦点离开后偶发不还原。
                // 解决：font ≥ 16pt + .autocorrectionDisabled() + .textInputAutocapitalization(.never)，
                // 配合 .scrollDismissesKeyboard(.interactively) 还原 inset。
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundStyle(.secondary)

                    TextField("Search foods, meals, brands", text: $searchText)
                        .font(.system(size: 16, weight: .regular))
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .submitLabel(.search)
                        .focused($isSearchFocused)

                    if !searchText.isEmpty {
                        Button(action: { searchText = "" }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 14))
                                .foregroundStyle(.secondary)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(14)
                .glassEffect(.regular, in: .rect(cornerRadius: 16, style: .continuous))
                .padding(.horizontal, 20)
                .padding(.bottom, 8)
            }
        }
        #if os(iOS)
        .background(Color(.systemBackground))
        #else
        .background(Color(.windowBackgroundColor))
        #endif
    }

    // 简单的前端过滤：按名称大小写不敏感匹配，避免输入时出现空白列表
    private var filteredFoods: [FoodItem] {
        if searchText.isEmpty { return FoodItem.mockData }
        return FoodItem.mockData.filter { food in
            food.name.localizedCaseInsensitiveContains(searchText)
        }
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
                    Text(food.imageIcon)
                        .font(.system(size: 36))
                        .frame(width: 56, height: 56)
                        .glassEffect(.clear, in: .rect(cornerRadius: 16, style: .continuous))

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
                            .glassEffect(
                                .regular.tint((food.brandColor ?? .gray).opacity(0.1)),
                                in: .capsule(style: .continuous)
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
            .buttonStyle(.glass)
            .glassEffect(.regular, in: .rect(cornerRadius: 20, style: .continuous))

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
                .glassEffect(.regular, in: .rect(cornerRadius: 20, style: .continuous))
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
