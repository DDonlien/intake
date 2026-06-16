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
                
                // Date Switcher - Glass cards with edge-to-edge scroll
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(Array(DayLog.mockWeek.enumerated()), id: \.element.id) { index, day in
                            DateCard(
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
                        Image(systemName: "waveform")
                            .font(.system(size: 22, weight: .medium))
                            .foregroundStyle(.purple)
                            .padding(10)
                            .glassEffect(.clear, in: .circle)
                        
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
                    .glassEffect(.regular, in: .rect(cornerRadius: 20))
                }
                .buttonStyle(.glass)
                .padding(.horizontal, 20)
                
                // Energy Ring Card - Thick glass with GlassEffectContainer
                GlassEffectContainer(spacing: 0) {
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
                        
                        // Bottom stats - Glass dividers
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
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 28))
                }
                .padding(.horizontal, 20)
                
                // Progress Section - Glass grid
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 16) {
                        HStack {
                            Text("Progress")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundStyle(.secondary)
                        }
                        
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
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24))
                }
                .padding(.horizontal, 20)
                
                // Health Sync Section - Glass
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 16) {
                        HStack {
                            Text("Health Sync")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
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
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24))
                }
                .padding(.horizontal, 20)
                
                // Meals Section - Glass cards
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 14) {
                        HStack {
                            Text("Meals")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                        }
                        
                        ForEach(MealEntry.mockData) { meal in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    Image(systemName: meal.icon)
                                        .font(.system(size: 20))
                                        .foregroundStyle(meal.color)
                                        .frame(width: 36, height: 36)
                                        .glassEffect(.clear, in: .circle)
                                    
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
                            .buttonStyle(.glass)
                            
                            if meal.id != MealEntry.mockData.last?.id {
                                Divider()
                                    .background(.white.opacity(0.08))
                            }
                        }
                    }
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24))
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

struct DateCard: View {
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
            .glassEffect(
                isSelected ? .regular.tint(.purple) : .clear,
                in: .rect(cornerRadius: 16, style: .continuous)
            )
        }
        .buttonStyle(.plain)
    }
}

struct GlassEnergyRing: View {
    let progress: Double
    let size: CGFloat
    let lineWidth: CGFloat
    let color: Color
    
    var body: some View {
        ZStack {
            Circle()
                .stroke(.ultraThinMaterial, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
            
            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    AngularGradient(
                        colors: [color.opacity(0.6), color, color.opacity(0.8), color.opacity(0.5)],
                        center: .center,
                        startAngle: .degrees(0),
                        endAngle: .degrees(360)
                    ),
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.2), value: progress)
            
            Circle()
                .trim(from: 0, to: progress)
                .stroke(.white.opacity(0.3), style: StrokeStyle(lineWidth: lineWidth * 0.3, lineCap: .round))
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.2), value: progress)
                .blur(radius: 2)
        }
        .frame(width: size, height: size)
    }
}

struct GlassProgressBar: View {
    let progress: Double
    let color: Color
    let height: CGFloat
    
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(.ultraThinMaterial)
                
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(color.gradient)
                    .frame(width: max(0, geo.size.width * progress), height: height)
                    .animation(.easeInOut(duration: 0.8), value: progress)
                
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

#Preview {
    LogView()
}
