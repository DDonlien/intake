import SwiftUI
import Foundation

struct DayLog: Identifiable {
    let id = UUID()
    let weekday: String
    let date: String
    let calories: Int
    let isToday: Bool
}

struct MacroProgress: Identifiable {
    let id = UUID()
    let name: String
    let icon: String
    let current: Double
    let target: Double
    let unit: String
    let color: Color
    
    var percentage: Double {
        min(current / target, 1.0)
    }
    
    var displayText: String {
        "\(Int(current)) / \(Int(target))\(unit)"
    }
}

struct MealEntry: Identifiable {
    let id = UUID()
    let type: MealType
    let calories: Int
    let icon: String
    let color: Color
}

enum MealType: String, CaseIterable {
    case breakfast = "Breakfast"
    case lunch = "Lunch"
    case dinner = "Dinner"
    case snack = "Snack"
}

struct HealthData: Identifiable {
    let id = UUID()
    let title: String
    let icon: String
    let value: String
    let color: Color
}

struct FoodItem: Identifiable {
    let id = UUID()
    let name: String
    let brand: String?
    let calories: Int
    let protein: Int
    let carbs: Int
    let fat: Int
    let fiber: Int
    let imageIcon: String
    let brandIcon: String?
    let brandColor: Color?
    
    var hasBrand: Bool {
        brand != nil && !brand!.isEmpty
    }
}

struct RecentFood: Identifiable {
    let id = UUID()
    let name: String
    let detail: String
    let calories: Int
    let icon: String
}

struct QuickAction: Identifiable {
    let id = UUID()
    let name: String
    let icon: String
    let color: Color
}

struct PlanSetting: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let value: String
    let color: Color
}

// MARK: - Mock Data

extension DayLog {
    static let mockWeek: [DayLog] = [
        DayLog(weekday: "Mon", date: "May 19", calories: 1585, isToday: false),
        DayLog(weekday: "Tue", date: "May 20", calories: 1760, isToday: false),
        DayLog(weekday: "Wed", date: "May 21", calories: 1332, isToday: false),
        DayLog(weekday: "Thu", date: "May 22", calories: 1695, isToday: false),
        DayLog(weekday: "Fri", date: "May 23", calories: 1482, isToday: false),
        DayLog(weekday: "Today", date: "May 24", calories: 1624, isToday: true)
    ]
}

extension MacroProgress {
    static let mockData: [MacroProgress] = [
        MacroProgress(name: "Protein", icon: "drop.fill", current: 102, target: 120, unit: "g", color: .blue),
        MacroProgress(name: "Fat", icon: "drop.fill", current: 58, target: 70, unit: "g", color: .orange),
        MacroProgress(name: "Carbs", icon: "leaf.fill", current: 179, target: 250, unit: "g", color: .green),
        MacroProgress(name: "Fiber", icon: "leaf.fill", current: 18, target: 28, unit: "g", color: .purple)
    ]
}

extension MealEntry {
    static let mockData: [MealEntry] = [
        MealEntry(type: .breakfast, calories: 412, icon: "sunrise.fill", color: .orange),
        MealEntry(type: .lunch, calories: 687, icon: "sun.max.fill", color: .yellow),
        MealEntry(type: .dinner, calories: 403, icon: "moon.fill", color: .indigo),
        MealEntry(type: .snack, calories: 122, icon: "cup.and.saucer.fill", color: .teal)
    ]
}

extension HealthData {
    static let mockData: [HealthData] = [
        HealthData(title: "Active Energy", icon: "flame.fill", value: "410 kcal", color: .orange),
        HealthData(title: "Basal Energy", icon: "drop.fill", value: "1,380 kcal", color: .blue),
        HealthData(title: "Steps / Workouts", icon: "shoe.fill", value: "8,642\n1 workout", color: .green),
        HealthData(title: "Connected", icon: "heart.fill", value: "Apple Health", color: .red)
    ]
}

extension FoodItem {
    static let mockData: [FoodItem] = [
        FoodItem(name: "Fried Chicken (2 pcs)", brand: "KFC", calories: 560, protein: 32, carbs: 28, fat: 33, fiber: 1, imageIcon: "🍗", brandIcon: "🍗", brandColor: .red),
        FoodItem(name: "Big Mac", brand: "McDonald's", calories: 563, protein: 25, carbs: 45, fat: 33, fiber: 3, imageIcon: "🍔", brandIcon: "🍔", brandColor: .yellow),
        FoodItem(name: "Caramel Macchiato (Grande)", brand: "Starbucks", calories: 250, protein: 10, carbs: 35, fat: 7, fiber: 0, imageIcon: "☕️", brandIcon: "☕️", brandColor: .green),
        FoodItem(name: "White Rice (1 cup)", brand: nil, calories: 205, protein: 4, carbs: 45, fat: 0, fiber: 1, imageIcon: "🍚", brandIcon: nil, brandColor: nil),
        FoodItem(name: "Oatmeal (1 cup)", brand: nil, calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 4, imageIcon: "🥣", brandIcon: nil, brandColor: nil),
        FoodItem(name: "Grilled Chicken Bowl", brand: "Homemade", calories: 420, protein: 35, carbs: 45, fat: 12, fiber: 6, imageIcon: "🥗", brandIcon: "🏠", brandColor: .purple)
    ]
}

extension RecentFood {
    static let mockData: [RecentFood] = [
        RecentFood(name: "Grilled Chicken Bowl", detail: "Chicken, Quinoa, Avocado, Greens", calories: 687, icon: "🥗"),
        RecentFood(name: "Greek Yogurt", detail: "Fage Total 2% • 1 cup", calories: 120, icon: "🥣"),
        RecentFood(name: "Apple", detail: "1 medium", calories: 95, icon: "🍎")
    ]
}

extension QuickAction {
    static let mockData: [QuickAction] = [
        QuickAction(name: "Scan", icon: "qrcode.viewfinder", color: .purple),
        QuickAction(name: "Voice", icon: "mic.fill", color: .purple),
        QuickAction(name: "Favorites", icon: "heart.fill", color: .purple),
        QuickAction(name: "Recent", icon: "clock.fill", color: .purple),
        QuickAction(name: "Custom", icon: "plus.circle.fill", color: .purple)
    ]
}

extension PlanSetting {
    static let mockData: [PlanSetting] = [
        PlanSetting(icon: "flame.fill", title: "Calorie Goal", value: "2,100 kcal", color: .orange),
        PlanSetting(icon: "chart.pie.fill", title: "Macronutrient Targets", value: "40% / 30% / 30%", color: .blue),
        PlanSetting(icon: "figure.walk", title: "Activity Level", value: "Moderately Active", color: .green),
        PlanSetting(icon: "ruler.fill", title: "Units", value: "kg, cm", color: .gray),
        PlanSetting(icon: "fork.knife", title: "Nutrition Preferences", value: "No preferences set", color: .pink)
    ]
}
