# PSM-DID-Uplift: Causal Reasoning Prototype for Traffic Attribution

This repository contains a research prototype for exploring how causal inference concepts can support more inspectable traffic attribution and operational decision-making.

The system is not intended as a production causal inference platform. It is a prototype for studying how methods such as PSM, DID, and uplift reasoning can be translated into decision-support workflows for product and growth teams.

## Project Information

| Item | Description |
|---|---|
| Status | Research prototype / Work in progress |
| Repository | https://github.com/MyraWang0406/PSM-DID-uplift |
| Live Demo | https://traffic-attribution.myrawzm0406.online/ |
| Research Area | Causal Reasoning, Decision Support, Product Analytics, Human-AI Collaboration |
| Main Methods | PSM-inspired comparison, DID-inspired comparison, uplift reasoning, dashboard-based interpretation |
| Intended Use | Research demonstration, not production deployment |

## Research Motivation

Product and growth teams often need to evaluate whether a traffic source, campaign, notification strategy, or operational intervention actually caused an observed outcome.

In practice, many decisions are made from surface-level metrics such as conversion rate, click-through rate, retention change, or revenue lift. These metrics are useful, but they can be misleading when user groups differ, interventions are not randomly assigned, or external factors change over time.

This prototype explores how causal inference concepts can be represented in a more understandable and inspectable decision-support interface.

## Research Questions

RQ1. How can causal inference concepts be presented to non-expert operators in an interpretable decision-support workflow?

RQ2. How can traffic attribution systems help users distinguish correlation, selection bias, and possible causal effect?

RQ3. How can dashboards support causal reasoning without overstating statistical certainty?

## System Overview

The prototype demonstrates a traffic attribution workflow that connects business questions with causal reasoning methods.

It helps users inspect:

- treatment and control groups
- before-and-after changes
- possible selection bias
- matched comparison groups
- uplift differences
- uncertainty in interpretation
- recommended next analysis steps

## Core Features

- Traffic source comparison
- Treatment / control group view
- PSM-inspired matching explanation
- DID-inspired before-after comparison
- Uplift-oriented segment interpretation
- Dashboard-based causal diagnosis
- Decision-support summary

## System Contribution

This prototype is not only a dashboard. Its main contribution is translating causal reasoning into an interaction workflow.

The system explores how product or growth operators can move from a simple metric observation:

"the metric changed"

to a more inspectable causal question:

"what changed, for whom, compared with whom, under what assumption, and with what uncertainty?"

## Example Workflow

1. The user selects a campaign, channel, or intervention.
2. The system displays observed performance changes.
3. The user inspects whether treated and comparison users differ.
4. The system presents matching or before-after comparison logic.
5. The user reviews possible causal explanations and limitations.
6. The system supports a cautious decision summary.

## Relation to Other Prototypes

This project extends my broader work on traceable AI-assisted decision-making into causal and operational analytics.

- `ADX-Mirix-1.15-cursor` focuses on white-box diagnosis in automated advertising workflows.
- `Agent-Assisted-User-Research-and-Decision-Support` focuses on user research and consumer insight workflows.
- `PSM-DID-uplift` focuses on causal reasoning and attribution under operational uncertainty.

## Evaluation Plan

This prototype can be evaluated through:

- user understanding of causal assumptions
- ability to distinguish correlation from possible causation
- perceived usefulness for campaign diagnosis
- clarity of treatment / control comparison
- decision confidence before and after causal explanation
- risk of over-trusting causal outputs

## Current Limitations

- This is a research prototype, not a validated causal inference tool.
- The current interface simplifies statistical assumptions.
- The system may use simulated or simplified data.
- It does not replace expert statistical analysis.
- Further work is needed to support robust diagnostics, sensitivity analysis, and uncertainty communication.

## Tech Stack

| Layer | Description |
|---|---|
| Frontend | Web-based dashboard |
| Deployment | Cloudflare Pages |
| Methods | PSM-inspired comparison, DID-inspired comparison, uplift reasoning |
| Data | Demo or simulated traffic attribution scenarios |

## Status and Scope

This repository is intended to demonstrate interaction logic, workflow design, and research framing. It is not a production-ready attribution system.

## License

This repository is for research and portfolio demonstration purposes.
