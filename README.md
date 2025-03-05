

# Simulation Explorer

A web-based visualization tool for exploring agent-based simulations with interactive timeline controls, metrics visualization, and detailed agent analysis.

## Overview

Simulation Explorer is a Next.js application designed to visualize and analyze the results of agent-based simulations. It provides an intuitive interface for exploring simulation data across different time steps, examining agent behaviors, and analyzing metrics.

The application features:
- Interactive timeline navigation
- Visualization of simulation grid and agents
- Detailed agent information panels
- Comprehensive metrics with charts and graphs
- Resource statistics and visualization
- Responsive design for desktop and mobile devices
- Keyboard navigation support

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/simulation-explorer.git
cd simulation-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
simulation-explorer/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard page
│   ├── simulation/         # Simulation viewer page
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── metrics/            # Metrics visualization components
│   │   └── panels/         # Individual metric panels
│   ├── ui/                 # Reusable UI components
│   ├── AgentDetailsPanel.tsx
│   ├── ConfigPanel.tsx
│   ├── MetricsPanel.tsx
│   ├── SimulationGrid.tsx
│   └── TimelineControls.tsx
├── types/                  # TypeScript type definitions
│   ├── agent.ts
│   ├── metrics.ts
│   └── simulation.ts
├── public/                 # Static assets
└── README.md               # Project documentation
```

## Key Features

### Timeline Navigation

The application provides a timeline control that allows users to navigate through different time steps of the simulation. Users can:
- Move forward and backward through time steps
- Jump to a specific time step
- Use keyboard shortcuts (left/right arrows) for navigation

### Simulation Grid

The grid visualization shows the state of the simulation at the current time step, including:
- Agent positions and types
- Resource locations and quantities
- Terrain features

### Agent Details

The agent details panel provides information about individual agents in the simulation:
- Agent attributes and state
- Health points and inventory
- Action history
- System and user prompts

### Metrics Visualization

The metrics panel displays various statistics about the simulation:
- Agent population statistics
- Health point distribution
- Resource statistics
- Population evolution over time

### Mobile Support

The application is fully responsive and provides a tabbed interface on mobile devices to navigate between different sections:
- Grid view
- Agent details
- Metrics
- Configuration

## Development

### Adding New Metrics

To add a new metric to the application:

1. Define the metric in `types/metrics.ts`
2. Update the `calculateMetrics` or create a new calculation function
3. Create a new panel component in `components/metrics/panels/`
4. Add the panel to `components/MetricsPanel.tsx`

### Adding New Visualizations

To add a new visualization:

1. Install any required chart libraries (if not using Chart.js)
2. Create a new component in the appropriate directory
3. Import and use the component in the relevant panel

### API Integration

The application fetches simulation data from API endpoints:

- `/api/checkpoints` - Get all simulation runs
- `/api/checkpoints/:runId` - Get all checkpoints for a specific run
- `/api/checkpoints/:runId/description` - Update the description of a run

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js for the React framework
- Chart.js for data visualization
- Tailwind CSS for styling
