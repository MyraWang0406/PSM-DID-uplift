# PSM-DID-Uplift: Causal Reasoning Prototype for Traffic Attribution

This repository contains a research prototype for exploring how causal inference concepts can support more inspectable traffic attribution and operational decision-making.

The system is not intended as a production causal inference platform. It is a prototype for studying how methods such as PSM, DID, and uplift modeling can be translated into decision-support workflows for product and growth teams.

## Project Information

| Item | Description |
|---|---|
| Status | Research prototype / Work in progress |
| Repository | https://github.com/MyraWang0406/PSM-DID-uplift |
| Live Demo | https://traffic-attribution.myrawzm0406.online/ |
| Research Area | Causal Reasoning, Decision Support, Product Analytics, Human-AI Collaboration |
| Main Methods | PSM, DID, uplift reasoning, dashboard-based interpretation |
| Intended Use | Research demonstration, not production deployment |

## Research Motivation

Product and growth teams often need to evaluate whether a traffic source, campaign, notification strategy, or intervention actually caused an outcome.

In practice, many decisions are made from surface-level metrics such as conversion rate, click-through rate, or retention change. These metrics are useful, but they can be misleading when user groups differ, interventions are not randomly assigned, or external factors change over time.

This prototype explores how causal inference concepts can be represented in a more understandable and inspectable decision-support interface.

## Research Questions

RQ1. How can causal inference concepts be presented to non-expert operators in an interpretable decision-support workflow?

RQ2. How can traffic attribution systems help users distinguish correlation, selection bias, and possible causal effect?

RQ3. How can dashboards support causal reasoning without overstating statistical certainty?

## System Overview

The prototype demonstrates a traffic attribution workflow that connects business questions with causal reasoning methods.

It explores how users can inspect:

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

It explores how product or growth operators can move from:

```text
metric changed
