import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Web3Provider } from "./contexts/Web3Context";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import DisputeDetail from "./pages/DisputeDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ArbitratorDashboard from "./pages/ArbitratorDashboard";
import Home from "./pages/Home";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={Landing} />
      <Route path={"/jobs"} component={Jobs} />
      <Route path={"/jobs/:id"} component={JobDetail} />
      <Route path={"/disputes/:id"} component={DisputeDetail} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/dashboard"} component={ClientDashboard} />
      <Route path={"/dashboard/freelancer"} component={FreelancerDashboard} />
      <Route path={"/dashboard/arbitrator"} component={ArbitratorDashboard} />
      <Route path={"/home"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <Web3Provider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </Web3Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
