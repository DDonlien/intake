import SwiftUI

struct MeView: View {
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 20) {
                // Title
                HStack {
                    Text("Me")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                    Spacer()
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Profile Header - Glass card
                GlassEffectContainer(spacing: 0) {
                    HStack(spacing: 16) {
                        ZStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [.purple.opacity(0.7), .pink.opacity(0.6)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 64, height: 64)
                            
                            Image(systemName: "person.crop.circle.fill")
                                .font(.system(size: 32))
                                .foregroundStyle(.white)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            HStack {
                                Text("Avery Kim")
                                    .font(.system(size: 22, weight: .bold, design: .rounded))
                                    .foregroundStyle(.primary)
                                Spacer()
                                
                                HStack(spacing: 4) {
                                    Image(systemName: "crown.fill")
                                        .font(.system(size: 10))
                                        .foregroundStyle(.purple)
                                    Text("Premium")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundStyle(.purple)
                                }
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .glassEffect(.regular.tint(.purple.opacity(0.15)), in: .capsule(style: .continuous))
                            }
                            
                            Text("You've got this. One choice at a time.")
                                .font(.system(size: 14, weight: .regular))
                                .foregroundStyle(.secondary)
                                .lineLimit(2)
                        }
                    }
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 28, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Goal Summary - Glass grid
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 16) {
                        HStack {
                            Text("Goal Summary")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                        }
                        
                        HStack(spacing: 0) {
                            GoalItem(icon: "target", title: "Goal", value: "2,000", unit: "kcal", color: .purple)
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            GoalItem(icon: "scalemass.fill", title: "Current", value: "68.2", unit: "kg", color: .blue)
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            GoalItem(icon: "flag.fill", title: "Target", value: "60.0", unit: "kg", color: .green)
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            GoalItem(icon: "flame.fill", title: "Daily", value: "2,100", unit: "kcal", color: .orange)
                            
                            Divider()
                                .background(.white.opacity(0.15))
                            
                            GoalItem(icon: "bolt.fill", title: "Protein", value: "120", unit: "g", color: .blue)
                        }
                    }
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Plan Settings - Glass list
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 0) {
                        HStack {
                            Text("Plan Settings")
                                .font(.system(size: 18, weight: .bold, design: .rounded))
                            Spacer()
                        }
                        .padding(.bottom, 12)
                        
                        ForEach(PlanSetting.mockData) { setting in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    Image(systemName: setting.icon)
                                        .font(.system(size: 18))
                                        .foregroundStyle(setting.color)
                                        .frame(width: 36, height: 36)
                                        .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))
                                    
                                    Text(setting.title)
                                        .font(.system(size: 16, weight: .medium, design: .rounded))
                                        .foregroundStyle(.primary)
                                    
                                    Spacer()
                                    
                                    Text(setting.value)
                                        .font(.system(size: 14, weight: .regular))
                                        .foregroundStyle(.secondary)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundStyle(.secondary)
                                }
                                .padding(.vertical, 12)
                            }
                            .buttonStyle(.glass)
                            
                            if setting.id != PlanSetting.mockData.last?.id {
                                Divider()
                                    .background(.white.opacity(0.1))
                                    .padding(.leading, 50)
                            }
                        }
                    }
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Health Data - Glass card
                GlassEffectContainer(spacing: 0) {
                    VStack(spacing: 0) {
                        Button(action: {}) {
                            HStack(spacing: 14) {
                                Image(systemName: "heart.fill")
                                    .font(.system(size: 18))
                                    .foregroundStyle(.red)
                                    .frame(width: 36, height: 36)
                                    .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Apple Health")
                                        .font(.system(size: 16, weight: .medium, design: .rounded))
                                        .foregroundStyle(.primary)
                                    HStack(spacing: 4) {
                                        Image(systemName: "checkmark.circle.fill")
                                            .font(.system(size: 12))
                                            .foregroundStyle(.green)
                                        Text("Connected")
                                            .font(.system(size: 13, weight: .semibold))
                                            .foregroundStyle(.green)
                                    }
                                }
                                
                                Spacer()
                                
                                VStack(alignment: .trailing, spacing: 2) {
                                    Text("Last sync")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundStyle(.secondary)
                                    Text("Today, 7:32 AM")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundStyle(.secondary)
                                }
                                
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundStyle(.secondary)
                            }
                            .padding(.vertical, 12)
                        }
                        .buttonStyle(.glass)
                    }
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Log & Trends - Glass
                GlassEffectContainer(spacing: 0) {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "chart.bar.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(.purple)
                                .frame(width: 36, height: 36)
                                .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Log & Trends")
                                    .font(.system(size: 16, weight: .medium, design: .rounded))
                                    .foregroundStyle(.primary)
                                Text("Track meals, workouts, and progress")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundStyle(.secondary)
                            }
                            
                            Spacer()
                            
                            VStack(alignment: .trailing, spacing: 2) {
                                Text("1,624 kcal")
                                    .font(.system(size: 14, weight: .bold, design: .rounded))
                                    .foregroundStyle(.purple)
                                Text("Logged today")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundStyle(.secondary)
                            }
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(.glass)
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Favorites - Glass
                GlassEffectContainer(spacing: 0) {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "star.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(.yellow)
                                .frame(width: 36, height: 36)
                                .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Favorites")
                                    .font(.system(size: 16, weight: .medium, design: .rounded))
                                    .foregroundStyle(.primary)
                                Text("Your favorite meals and recipes")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundStyle(.secondary)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(.glass)
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                // Settings - Glass
                GlassEffectContainer(spacing: 0) {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "gearshape.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(.gray)
                                .frame(width: 36, height: 36)
                                .glassEffect(.clear, in: .rect(cornerRadius: 10, style: .continuous))
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Settings")
                                    .font(.system(size: 16, weight: .medium, design: .rounded))
                                    .foregroundStyle(.primary)
                                Text("App preferences and more")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundStyle(.secondary)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(.glass)
                    .padding(18)
                    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))
                }
                .padding(.horizontal, 20)
                
                Spacer().frame(height: 40)
            }
        }
        #if os(iOS)
        .background(Color(.systemBackground))
        #else
        .background(Color(.windowBackgroundColor))
        #endif
    }
}

struct GoalItem: View {
    let icon: String
    let title: String
    let value: String
    let unit: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(color)
            
            Text(title)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(.secondary)
                .lineLimit(1)
            
            Text(value)
                .font(.system(size: 16, weight: .bold, design: .rounded))
                .foregroundStyle(.primary)
            
            Text(unit)
                .font(.system(size: 10, weight: .medium))
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}

#Preview {
    MeView()
}
