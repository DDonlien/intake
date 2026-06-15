import SwiftUI

struct LogView: View {
    @State private var selectedDayIndex = 5
    @State private var selectedMealIndex: Int? = nil
    
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
                
                // Date Switcher
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
                
                // Voice Log Entry
                Button(action: {}) {
                    HStack(spacing: 12) {
                        Image(systemName: "waveform")
                            .font(.system(size: 22, weight: .medium))
                            .foregroundColor(.purple)
                            .frame(width: 40, height: 40)
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                            )
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Log with voice")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.primary)
                            Text("Tap to speak your meal")
                                .font(.system(size: 13, weight: .regular))
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.secondary)
                    }
                    .padding(14)
                    .background(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(.thinMaterial)
                            .overlay(
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .stroke(Color.white.opacity(0.15), lineWidth: 1)
                            )
                    )
                }
                .buttonStyle(PlainButtonStyle())
                .padding(.horizontal, 20)
                
                // Energy Ring Card
                GlassCard {
                    VStack(spacing: 16) {
                        HStack {
                            Text("Energy Ring")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                            HStack(spacing: 4) {
                                Text("+\(Int(exerciseBonus))")
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(.green)
                                Text("Exercise")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                            }
                            Image(systemName: "info.circle")
                                .font(.system(size: 14))
                                .foregroundColor(.secondary)
                        }
                        
                        ZStack {
                            // Outer ring for exercise bonus
                            CircularProgressRing(
                                progress: limitWithBonus / (goal * 1.2),
                                lineWidth: 8,
                                color: .green.opacity(0.4),
                                size: 220
                            )
                            
                            // Main ring
                            CircularProgressRing(
                                progress: progress,
                                lineWidth: 18,
                                color: .purple,
                                size: 200
                            )
                            
                            // Center content
                            VStack(spacing: 6) {
                                Text("Eaten")
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundColor(.secondary)
                                
                                Text("\(Int(eaten))")
                                    .font(.system(size: 36, weight: .bold, design: .rounded))
                                    .foregroundColor(.primary)
                                
                                Text("kcal")
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundColor(.secondary)
                                
                                VStack(spacing: 2) {
                                    Text("Deficit")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundColor(.secondary)
                                    Text("\(Int(deficit))")
                                        .font(.system(size: 16, weight: .bold, design: .rounded))
                                        .foregroundColor(.purple)
                                }
                                .padding(.top, 4)
                                
                                Text("Left to eat")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                                    .padding(.top, 2)
                                Text("\(Int(leftToEat))")
                                    .font(.system(size: 16, weight: .bold, design: .rounded))
                                    .foregroundColor(.green)
                            }
                        }
                        .frame(height: 220)
                        
                        // Bottom stats
                        HStack(spacing: 0) {
                            VStack(spacing: 4) {
                                Text("Goal")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                                Text("\(Int(goal)) kcal")
                                    .font(.system(size: 14, weight: .bold, design: .rounded))
                                    .foregroundColor(.primary)
                            }
                            .frame(maxWidth: .infinity)
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            VStack(spacing: 4) {
                                Text("Total Burn")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                                HStack(spacing: 4) {
                                    Image(systemName: "flame.fill")
                                        .font(.system(size: 10))
                                        .foregroundColor(.orange)
                                    Text("\(Int(totalBurn)) kcal")
                                        .font(.system(size: 14, weight: .bold, design: .rounded))
                                        .foregroundColor(.primary)
                                }
                            }
                            .frame(maxWidth: .infinity)
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            VStack(spacing: 4) {
                                Text("Limit (with bonus)")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                                HStack(spacing: 4) {
                                    Image(systemName: "plus.circle.fill")
                                        .font(.system(size: 10))
                                        .foregroundColor(.green)
                                    Text("\(Int(limitWithBonus)) kcal")
                                        .font(.system(size: 14, weight: .bold, design: .rounded))
                                        .foregroundColor(.primary)
                                }
                            }
                            .frame(maxWidth: .infinity)
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Progress Section
                GlassCard {
                    VStack(spacing: 16) {
                        SectionHeader(title: "Progress", icon: nil, action: {})
                        
                        LazyVGrid(columns: [
                            GridItem(.flexible()),
                            GridItem(.flexible())
                        ], spacing: 16) {
                            ForEach(MacroProgress.mockData) { macro in
                                VStack(alignment: .leading, spacing: 8) {
                                    HStack {
                                        Image(systemName: macro.icon)
                                            .font(.system(size: 14))
                                            .foregroundColor(macro.color)
                                        Text(macro.name)
                                            .font(.system(size: 13, weight: .semibold))
                                            .foregroundColor(.primary)
                                        Spacer()
                                        Text(macro.displayText)
                                            .font(.system(size: 12, weight: .medium))
                                            .foregroundColor(.secondary)
                                    }
                                    
                                    LinearProgressBar(
                                        progress: macro.percentage,
                                        color: macro.color,
                                        height: 6
                                    )
                                    
                                    Text("\(Int(macro.percentage * 100))%")
                                        .font(.system(size: 12, weight: .bold, design: .rounded))
                                        .foregroundColor(macro.color)
                                }
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Health Sync Section
                GlassCard {
                    VStack(spacing: 16) {
                        HStack {
                            SectionHeader(title: "Health Sync", icon: nil, action: nil)
                            Spacer()
                            HStack(spacing: 4) {
                                Text("Last sync: Today, 7:32 AM")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.secondary)
                                Image(systemName: "arrow.clockwise")
                                    .font(.system(size: 12))
                                    .foregroundColor(.secondary)
                            }
                        }
                        
                        HStack(spacing: 12) {
                            ForEach(HealthData.mockData) { health in
                                VStack(spacing: 6) {
                                    Image(systemName: health.icon)
                                        .font(.system(size: 20))
                                        .foregroundColor(health.color)
                                    
                                    Text(health.title)
                                        .font(.system(size: 10, weight: .medium))
                                        .foregroundColor(.secondary)
                                        .multilineTextAlignment(.center)
                                        .lineLimit(1)
                                    
                                    Text(health.value)
                                        .font(.system(size: 13, weight: .bold, design: .rounded))
                                        .foregroundColor(.primary)
                                        .multilineTextAlignment(.center)
                                        .lineLimit(2)
                                }
                                .frame(maxWidth: .infinity)
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Meals Section
                GlassCard {
                    VStack(spacing: 14) {
                        SectionHeader(title: "Meals", icon: nil, action: nil)
                        
                        ForEach(MealEntry.mockData) { meal in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    Image(systemName: meal.icon)
                                        .font(.system(size: 20))
                                        .foregroundColor(meal.color)
                                        .frame(width: 36, height: 36)
                                        .background(
                                            Circle()
                                                .fill(meal.color.opacity(0.15))
                                        )
                                    
                                    Text(meal.type.rawValue)
                                        .font(.system(size: 16, weight: .semibold))
                                        .foregroundColor(.primary)
                                    
                                    Spacer()
                                    
                                    Text("\(meal.calories) kcal")
                                        .font(.system(size: 15, weight: .bold, design: .rounded))
                                        .foregroundColor(.primary)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundColor(.secondary)
                                }
                                .padding(.vertical, 8)
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            if meal.id != MealEntry.mockData.last?.id {
                                Divider()
                                    .background(Color.white.opacity(0.08))
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
    LogView()
}
