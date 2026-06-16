import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 1
    
    var body: some View {
        TabView(selection: $selectedTab) {
            Tab("Me", systemImage: "person.fill", value: 0) {
                MeView()
            }
            
            Tab("Log", systemImage: "chart.bar.fill", value: 1) {
                LogView()
            }
            
            Tab("Bank", systemImage: "building.columns.fill", value: 2) {
                BankView()
            }
            
            Tab("", systemImage: "plus.circle.fill", value: 3) {
                RecordView()
            }
        }
        .tint(.primary)
    }
}

#Preview {
    ContentView()
}
