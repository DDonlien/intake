import SwiftUI

struct GlassCard<Content: View>: View {
    let content: Content
    let cornerRadius: CGFloat
    let material: Material
    
    init(cornerRadius: CGFloat = 16, material: Material = .thinMaterial, @ViewBuilder content: () -> Content) {
        self.cornerRadius = cornerRadius
        self.material = material
        self.content = content()
    }
    
    var body: some View {
        content
            .padding(16)
            .background(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(material)
                    .overlay(
                        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                            .stroke(Color.white.opacity(0.15), lineWidth: 1)
                    )
            )
    }
}

struct GlassChip: View {
    let text: String
    let icon: String?
    let color: Color
    
    var body: some View {
        HStack(spacing: 4) {
            if let icon = icon {
                Image(systemName: icon)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(color)
            }
            Text(text)
                .font(.system(size: 13, weight: .medium))
                .foregroundColor(.primary)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(
            Capsule()
                .fill(.ultraThinMaterial)
                .overlay(
                    Capsule()
                        .stroke(Color.white.opacity(0.12), lineWidth: 0.5)
                )
        )
    }
}

struct CircularProgressRing: View {
    let progress: Double
    let lineWidth: CGFloat
    let color: Color
    let size: CGFloat
    
    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.white.opacity(0.1), lineWidth: lineWidth)
            
            Circle()
                .trim(from: 0, to: progress)
                .stroke(
                    AngularGradient(
                        colors: [color.opacity(0.7), color, color.opacity(0.7)],
                        center: .center,
                        startAngle: .degrees(0),
                        endAngle: .degrees(360)
                    ),
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.0), value: progress)
        }
        .frame(width: size, height: size)
    }
}

struct LinearProgressBar: View {
    let progress: Double
    let color: Color
    let height: CGFloat
    
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(Color.white.opacity(0.08))
                
                RoundedRectangle(cornerRadius: height / 2, style: .continuous)
                    .fill(color.gradient)
                    .frame(width: max(0, geo.size.width * progress), height: height)
                    .animation(.easeInOut(duration: 0.8), value: progress)
            }
        }
        .frame(height: height)
    }
}

struct SectionHeader: View {
    let title: String
    let icon: String?
    let action: (() -> Void)?
    
    var body: some View {
        HStack {
            HStack(spacing: 6) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.secondary)
                }
                Text(title)
                    .font(.system(size: 18, weight: .bold, design: .rounded))
                    .foregroundColor(.primary)
            }
            
            Spacer()
            
            if let action = action {
                Button(action: action) {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.secondary)
                }
            }
        }
    }
}

struct IconValueBlock: View {
    let icon: String
    let title: String
    let value: String
    let unit: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(color)
            
            Text(title)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            Text(value)
                .font(.system(size: 20, weight: .bold, design: .rounded))
                .foregroundColor(.primary)
            
            Text(unit)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(.secondary)
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
            VStack(spacing: 6) {
                Text(dayLog.weekday)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(isSelected ? .white : .secondary)
                
                Text(dayLog.date)
                    .font(.system(size: 11, weight: .regular))
                    .foregroundColor(isSelected ? .white.opacity(0.8) : .secondary)
                
                Text("\(dayLog.calories)")
                    .font(.system(size: 16, weight: .bold, design: .rounded))
                    .foregroundColor(isSelected ? .white : .primary)
                
                Text("kcal")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(isSelected ? .white.opacity(0.7) : .secondary)
            }
            .padding(.vertical, 10)
            .padding(.horizontal, 14)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(isSelected ? Color.blue.opacity(0.8) : .ultraThinMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .stroke(Color.white.opacity(isSelected ? 0.2 : 0.1), lineWidth: 1)
                    )
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
