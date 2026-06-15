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
                
                // Profile Header
                GlassCard {
                    HStack(spacing: 16) {
                        Image(systemName: "person.crop.circle.fill")
                            .font(.system(size: 56))
                            .foregroundColor(.purple)
                            .frame(width: 64, height: 64)
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                            )
                        
                        VStack(alignment: .leading, spacing: 4) {
                            HStack {
                                Text("Avery Kim")
                                    .font(.system(size: 22, weight: .bold, design: .rounded))
                                    .foregroundColor(.primary)
                                Spacer()
                                HStack(spacing: 4) {
                                    Image(systemName: "crown.fill")
                                        .font(.system(size: 12))
                                        .foregroundColor(.purple)
                                    Text("Premium")
                                        .font(.system(size: 13, weight: .semibold))
                                        .foregroundColor(.purple)
                                }
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(
                                    Capsule()
                                        .fill(.purple.opacity(0.15))
                                )
                            }
                            
                            Text("You've got this. One choice at a time.")
                                .font(.system(size: 14, weight: .regular))
                                .foregroundColor(.secondary)
                                .lineLimit(2)
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Goal Summary
                GlassCard {
                    VStack(spacing: 16) {
                        SectionHeader(title: "Goal Summary", icon: nil, action: nil)
                        
                        HStack(spacing: 0) {
                            IconValueBlock(
                                icon: "target",
                                title: "Goal",
                                value: "2,000",
                                unit: "kcal",
                                color: .purple
                            )
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            IconValueBlock(
                                icon: "scalemass.fill",
                                title: "Current Weight",
                                value: "68.2",
                                unit: "kg",
                                color: .blue
                            )
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            IconValueBlock(
                                icon: "flag.fill",
                                title: "Target Weight",
                                value: "60.0",
                                unit: "kg",
                                color: .green
                            )
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            IconValueBlock(
                                icon: "flame.fill",
                                title: "Daily Calories",
                                value: "2,100",
                                unit: "kcal",
                                color: .orange
                            )
                            
                            Divider()
                                .background(Color.white.opacity(0.1))
                            
                            IconValueBlock(
                                icon: "bolt.fill",
                                title: "Protein Target",
                                value: "120",
                                unit: "g",
                                color: .blue
                            )
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Plan Settings
                GlassCard {
                    VStack(spacing: 0) {
                        SectionHeader(title: "Plan Settings", icon: nil, action: nil)
                            .padding(.bottom, 12)
                        
                        ForEach(PlanSetting.mockData) { setting in
                            Button(action: {}) {
                                HStack(spacing: 14) {
                                    Image(systemName: setting.icon)
                                        .font(.system(size: 18))
                                        .foregroundColor(setting.color)
                                        .frame(width: 32, height: 32)
                                        .background(
                                            RoundedRectangle(cornerRadius: 8, style: .continuous)
                                                .fill(setting.color.opacity(0.12))
                                        )
                                    
                                    Text(setting.title)
                                        .font(.system(size: 16, weight: .medium))
                                        .foregroundColor(.primary)
                                    
                                    Spacer()
                                    
                                    Text(setting.value)
                                        .font(.system(size: 14, weight: .regular))
                                        .foregroundColor(.secondary)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundColor(.secondary)
                                }
                                .padding(.vertical, 12)
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                            if setting.id != PlanSetting.mockData.last?.id {
                                Divider()
                                    .background(Color.white.opacity(0.08))
                                    .padding(.leading, 46)
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                // Health Data
                GlassCard {
                    VStack(spacing: 0) {
                        Button(action: {}) {
                            HStack(spacing: 14) {
                                Image(systemName: "heart.fill")
                                    .font(.system(size: 18))
                                    .foregroundColor(.red)
                                    .frame(width: 32, height: 32)
                                    .background(
                                        RoundedRectangle(cornerRadius: 8, style: .continuous)
                                            .fill(.red.opacity(0.12))
                                    )
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Apple Health")
                                        .font(.system(size: 16, weight: .medium))
                                        .foregroundColor(.primary)
                                    HStack(spacing: 4) {
                                        Image(systemName: "checkmark.circle.fill")
                                            .font(.system(size: 12))
                                            .foregroundColor(.green)
                                        Text("Connected")
                                            .font(.system(size: 13, weight: .medium))
                                            .foregroundColor(.green)
                                    }
                                }
                                
                                Spacer()
                                
                                VStack(alignment: .trailing, spacing: 2) {
                                    Text("Last sync")
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundColor(.secondary)
                                    Text("Today, 7:32 AM")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundColor(.secondary)
                                }
                                
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundColor(.secondary)
                            }
                            .padding(.vertical, 12)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal, 20)
                
                // Log & Trends
                GlassCard {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "chart.bar.fill")
                                .font(.system(size: 18))
                                .foregroundColor(.purple)
                                .frame(width: 32, height: 32)
                                .background(
                                    RoundedRectangle(cornerRadius: 8, style: .continuous)
                                        .fill(.purple.opacity(0.12))
                                )
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Log & Trends")
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(.primary)
                                Text("Track meals, workouts, and progress")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                            
                            VStack(alignment: .trailing, spacing: 2) {
                                Text("1,624 kcal")
                                    .font(.system(size: 14, weight: .bold, design: .rounded))
                                    .foregroundColor(.purple)
                                Text("Logged today")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.secondary)
                            }
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(.horizontal, 20)
                
                // Favorites
                GlassCard {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "star.fill")
                                .font(.system(size: 18))
                                .foregroundColor(.yellow)
                                .frame(width: 32, height: 32)
                                .background(
                                    RoundedRectangle(cornerRadius: 8, style: .continuous)
                                        .fill(.yellow.opacity(0.12))
                                )
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Favorites")
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(.primary)
                                Text("Your favorite meals and recipes")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(.horizontal, 20)
                
                // Settings
                GlassCard {
                    Button(action: {}) {
                        HStack(spacing: 14) {
                            Image(systemName: "gearshape.fill")
                                .font(.system(size: 18))
                                .foregroundColor(.gray)
                                .frame(width: 32, height: 32)
                                .background(
                                    RoundedRectangle(cornerRadius: 8, style: .continuous)
                                        .fill(.gray.opacity(0.12))
                                )
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Settings")
                                    .font(.system(size: 16, weight: .medium))
                                    .foregroundColor(.primary)
                                Text("App preferences and more")
                                    .font(.system(size: 13, weight: .regular))
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
                .padding(.horizontal, 20)
                
                Spacer().frame(height: 40)
            }
        }
        .background(Color(.systemBackground))
    }
}

#Preview {
    MeView()
}
