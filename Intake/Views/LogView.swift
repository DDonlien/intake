import SwiftUI

struct LogView: View {
    @State private var selectedDayIndex = 5
    
    let eaten: Double = 1624
    let goal: Double = 2000
    let totalBurn: Double = 2210
    let limitWithBonus: Double = 2210
    let exerciseBonus: Double = 210
    
    var deficit: Double { totalBurn - eaten }
    var leftToEat: Double { limitWithBonus - eaten }
    var progress: Double { eaten / limitWithBonus }
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Title
                HStack {
                    Text("Log")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                    Spacer()
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Date Switcher - Glass cards
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(Array(DayLog.mockWeek.enumerated()), id: \.element.id) { index, day in
                            DateGlassCard(
                                dayLog: day,
                                isSelected: selectedDayIndex == index
                            ) {
                                selectedDayIndex = index
                            }
                        }
                    }
                    .padding(.horizontal, 20)
                }
                
                // Voice Log Entry - Glass button
                Button(action: {}) {
                    HStack(spacing: 14) {
                        GlassIconContainer(icon: "waveform", color: .purple, size: 44)
                        
                        VStack(alignment: .leading, spacing: 3) {
                            Text("Log with voice")
                                .font(.system(size: 16, weight: .semibold, design: .rounded))
                                .foregroundStyle(.primary)
                            Text("Tap to speak your meal")
                                .font(.system(size: 13, weight: .regular))
                                .foregroundStyle(.secondary)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(.secondary)
                    }
                    .padding(14)
                    .background(
                        ZStack {
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .fill(.thinMaterial)
                            
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .stroke(
                                    .white.opacity(0.3),
                                    lineWidth: 1
                                )
                            
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .stroke(
                                    LinearGradient(
                                        colors: [.white.opacity(0.4), .white.opacity(0.05), .white.opacity(0.0)],
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
                                    colors: [.white.opacity(0.12), .white.opacity(0.0)],
                                    startPoint: .top,
                                    endPoint: .center
                                )
                            )
                            .allowsHitTesting(false)
                    )
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 20)
                
                // Energy Ring Card - Thick glass
                LiquidGlassCard(cornerRadius: 28, thickness: .thick, hasDepth: true) {
                    VStack(spacing: 20) {
                        HStack {
                            Text("Energy Ring")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                            HStack(spacing: 4) {
                                Text("+\(Int(exerciseBonus))")
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundStyle(.green)
                                Text("Exercise")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                            }
                            Image(systemName: "info.circle")
                                .font(.system(size: 14))
                                .foregroundStyle(.secondary)
                        }
                        
                        ZStack {
                            // Outer exercise ring
                            GlassEnergyRing(progress: limitWithBonus / (goal * 1.2), size: 230, lineWidth: 10, color: .green.opacity(0.5))
                            
                            // Main ring
                            GlassEnergyRing(progress: progress, size: 205, lineWidth: 22, color: .purple)
                            
                            // Center content
                            VStack(spacing: 5) {
                                Text("Eaten")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                                
                                Text("\(Int(eaten))")
                                    .font(.system(size: 36, weight: .bold, design: .rounded))
                                    .foregroundStyle(.primary)
                                
                                Text("kcal")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                                
                                VStack(spacing: 2) {
                                    Text("Deficit")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundStyle(.secondary)
                                    Text("\(Int(deficit))")
                                        .font(.system(size: 15, weight: .bold, design: .rounded))
                                        .foregroundStyle(.purple)
                                }
                                .padding(.top, 4)
                                
                                Text("Left to eat")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundStyle(.secondary)
                                    .padding(.top, 2)
                                Text("\(Int(leftToEat))")
                                    .font(.system(size: 15, weight: .bold, design: .rounded))
                                    .foregroundStyle(.green)
                            }
                        }
                        .frame(height: 230)
                        
                        // Bottom stats - Glass divider
                        HStack(spacing: 0) {
                            StatColumn(title: "Goal", value: "\(Int(goal))", unit: "kcal")
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            StatColumn(title: "Total Burn", value: "\(Int(totalBurn))", unit: "kcal", icon: "flame.fill", iconColor: .orange)
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            StatColumn(title: "Limit (bonus)", value: "\(Int(limitWithBonus))", unit: "kcal", icon: "plus.circle.fill", iconColor: .green)
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Progress Section - Glass grid
                LiquidGlassCard(cornerRadius: 24, thickness: .standard) {
                    VStack(spacing: 16) {
                        GlassSectionHeader(title: "Progress", icon: nil, action: {})
                        
                        LazyVGrid(columns: [
                            GridItem(.flexible()),
                            GridItem(.flexible())
                        ], spacing: 16) {
                            ForEach(MacroProgress.mockData) { macro in
                                VStack(alignment: .leading, spacing: 8) {
                                    HStack {
                                        HStack(spacing: 5) {
                                            Image(systemName: macro.icon)
                                                .font(.system(size: 13))
                                                .foregroundStyle(macro.color)
                                            Text(macro.name)
                                                .font(.system(size: 13, weight: .semibold))
                                                .foregroundStyle(.primary)
                                        }
                                        Spacer()
                                        Text(macro.displayText)
                                            .font(.system(size: 12, weight: .medium))
                                            .foregroundStyle(.secondary)
                                    }
                                    
                                    GlassProgressBar(progress: macro.percentage, color: macro.color, height: 7)
                                    
                                    Text("\(Int(macro.percentage * 100))%")
                                        .font(.system(size: 12, weight: .bold, design: .rounded))
                                        .foregroundStyle(macro.color)
                                }
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Health Sync Section
                LiquidGlassCard(cornerRadius: 24, thickness: .standard) {
                    VStack(spacing: 16) {
                        HStack {
                            GlassSectionHeader(title: "Health Sync", icon: nil, action: nil)
                            Spacer()
                            HStack(spacing: 4) {
                                Text("Last sync: Today, 7:32 AM")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundStyle(.secondary)
                                Image(systemName: "arrow.clockwise")
                                    .font(.system(size: 12))
                                    .foregroundStyle(.secondary)
                            }
                        }
                        
                        HStack(spacing: 12) {
                            ForEach(HealthData.mockData) { health in
                                VStack(spacing: 6) {
                                    Image(systemName: health.icon)
                                        .font(.system(size: 22))
                                        .foregroundStyle(health.color)
                                    
                                    Text(health.title)
                                        .font(.system(size: 10, weight: .medium))
                                        .foregroundStyle(.secondary)
                                        .multilineTextAlignment(.center)
                                        .lineLimit(1)
                                    
                                    Text(health.value)
                                        .font(.system(size: 13, weight: .bold, design: .rounded))
                                        .foregroundStyle(.primary)
                                        .multilineTextAlignment(.center)
                                        .lineLimit(2)
                                }
                                .frame(maxWidth: .infinity)
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Meals Section - Glass cards
                LiquidGlassCard(cornerRadius: 24, thickness: .standard) {
                    VStack(spacing: 14) {
                        GlassSectionHeader(title: "Meals", icon: nil, action: nil)
                        
                        ForEach(MealEntry.mockData) { meal in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    GlassIconContainer(icon: meal.icon, color: meal.color, size: 40)
                                    
                                    Text(meal.type.rawValue)
                                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                                        .foregroundStyle(.primary)
                                    
                                    Spacer()
                                    
                                    Text("\(meal.calories) kcal")
                                        .font(.system(size: 15, weight: .semibold, design: .rounded))
                                        .foregroundStyle(.primary)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundStyle(.secondary)
                                }
                                .padding(.vertical, 8)
                            }
                            .buttonStyle(.plain)
                            
                            if meal.id != MealEntry.mockData.last?.id {
                                Divider()
                                    .background(.white.opacity(0.1))
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

struct StatColumn: View {
    let title: String
    let value: String
    let unit: String
    var icon: String? = nil
    var iconColor: Color? = nil
    
    var body: some View {
        VStack(spacing: 4) {
            Text(title)
                .font(.system(size: 11, weight: .medium))
                .foregroundStyle(.secondary)
            
            if let icon = icon, let color = iconColor {
                HStack(spacing: 3) {
                    Image(systemName: icon)
                        .font(.system(size: 10))
                        .foregroundStyle(color)
                    Text(value + " " + unit)
                        .font(.system(size: 13, weight: .semibold, design: .rounded))
                        .foregroundStyle(.primary)
                }
            } else {
                Text(value + " " + unit)
                    .font(.system(size: 13, weight: .semibold, design: .rounded))
                    .foregroundStyle(.primary)
            }
        }
        .frame(maxWidth: .infinity)
    }
}

struct DateGlassCard: View {
    let dayLog: DayLog
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(spacing: 5) {
                Text(dayLog.weekday)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(isSelected ? .white : .secondary)
                
                Text(dayLog.date)
                    .font(.system(size: 11, weight: .regular))
                    .foregroundStyle(isSelected ? .white.opacity(0.8) : .secondary)
                
                Text("\(dayLog.calories)")
                    .font(.system(size: 16, weight: .bold, design: .rounded))
                    .foregroundStyle(isSelected ? .white : .primary)
                
                Text("kcal")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(isSelected ? .white.opacity(0.7) : .secondary)
            }
            .padding(.vertical, 10)
            .padding(.horizontal, 14)
            .background(
                ZStack {
                    if isSelected {
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(.purple.opacity(0.85))
                    } else {
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(.ultraThinMaterial)
                        
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .stroke(
                                .white.opacity(0.2),
                                lineWidth: 1
                            )
                    }
                }
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(
                        LinearGradient(
                            colors: [.white.opacity(isSelected ? 0.2 : 0.1), .white.opacity(0.0)],
                            startPoint: .top,
                            endPoint: .center
                        )
                    )
                    .allowsHitTesting(false)
            )
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    LogView()
}
