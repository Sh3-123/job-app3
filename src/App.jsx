import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import AppProof from './pages/ProofPage';
import TrackProof from './pages/TrackProof';
import StepPage from './pages/StepPage';
import { ResumeProvider } from './context/ResumeContext';

const STEPS = [
  { path: '/rb/01-problem', step: 1, title: 'Problem Statement', subtitle: "Define the core problem you are solving" },
  { path: '/rb/02-market', step: 2, title: 'Market Research', subtitle: "Analyze the market and competitors" },
  { path: '/rb/03-architecture', step: 3, title: 'Architecture', subtitle: "Define the high-level system architecture" },
  { path: '/rb/04-hld', step: 4, title: 'HLD', subtitle: "High Level Design of components" },
  { path: '/rb/05-lld', step: 5, title: 'LLD', subtitle: "Low Level Design of classes and functions" },
  { path: '/rb/06-build', step: 6, title: 'Build', subtitle: "Implement the core functionality" },
  { path: '/rb/07-test', step: 7, title: 'Test', subtitle: "Verify the implementation with tests" },
  { path: '/rb/08-ship', step: 8, title: 'Ship', subtitle: "Deploy and release the application" },
];

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/proof" element={<AppProof />} />

          {/* Project Track Routes */}
          {STEPS.map((stepInfo) => (
            <Route
              key={stepInfo.path}
              path={stepInfo.path}
              element={
                <StepPage
                  stepNumber={stepInfo.step}
                  title={stepInfo.title}
                  subtitle={stepInfo.subtitle}
                />
              }
            />
          ))}
          <Route path="/rb/proof" element={<TrackProof />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;
