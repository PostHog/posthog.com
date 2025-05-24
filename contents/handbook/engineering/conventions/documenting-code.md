---
title: Documenting code
sidebar: Handbook
---

## Code should be self-documenting

The vast majority of code should be self-documenting. If it's complicated to figure out, you probably need to make it simpler. This is especially important for APIs and interfaces that other teams will interact with. 

## README when it's not

For the cases when code isn't self-documenting or easy to understand (we can just say "someone else wrote it...") the best way to document the code is to include a README.md file in the directory that is closest to the entry point of the code. This should describe the general flow of interacting with the functions, but only to the point where the code starts to become self-documenting.

READMEs for code should be short. If they are long, then your interfaces should be made simpler.
