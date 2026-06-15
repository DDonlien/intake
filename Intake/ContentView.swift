import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 1 // Log as default home
    
    var body: some View {
        ZStack {
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
}

#Preview {
    ContentView()
}
