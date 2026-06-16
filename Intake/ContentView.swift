import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 1
    
    var body: some View {
        TabView(selection: $selectedTab) {
            MeView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Me")
                }
                .tag(0)
            
            LogView()
                .tabItem {
                    Image(systemName: "chart.bar.fill")
                    Text("Log")
                }
                .tag(1)
            
            BankView()
                .tabItem {
                    Image(systemName: "building.columns.fill")
                    Text("Bank")
                }
                .tag(2)
            
            RecordView()
                .tabItem {
                    Image(systemName: "plus.circle.fill")
                }
                .tag(3)
        }
    }
}

#Preview {
    ContentView()
}
