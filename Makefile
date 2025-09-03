# ---- Makefile for Expo / Expo Router (TypeScript) ----
SHELL := /bin/bash

# You can override these, e.g. `make start PM=pnpm`
PM      ?= npm
EXPO    := npx expo
EAS     := npx eas
ESLINT  := npx eslint
PRETTIER:= npx prettier
TSC     := npx tsc
JEST    := npx jest

# Default profile/branch for EAS
EAS_PROFILE ?= production
EAS_BRANCH  ?= main

.PHONY: help install clean reset start start-clear android ios web doctor prebuild prebuild-ios prebuild-android \
        lint fix format typecheck test build-android build-ios submit-android submit-ios publish login-eas

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "}; /^[a-zA-Z0-9_.-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# --- Setup & housekeeping ---
install: ## Install dependencies (uses $(PM))
	$(PM) install

clean: ## Clean Metro cache and Expo artifacts (keeps node_modules)
	$(EXPO) start -c >/dev/null 2>&1 || true
	rm -rf .expo

reset: ## Full reset: remove node_modules and Expo artifacts, then install
	rm -rf node_modules .expo
	$(PM) install

# --- Dev server ---
start: ## Start Expo dev server
	$(EXPO) start

start-clear: ## Start Expo with a clean Metro cache
	$(EXPO) start -c

android: ## Open on Android emulator/device
	$(EXPO) start --android

ios: ## Open on iOS simulator (macOS)
	$(EXPO) start --ios

web: ## Open on web
	$(EXPO) start --web

doctor: ## Run Expo doctor
	npx expo-doctor

# --- Native project (only if you need custom native) ---
prebuild: ## Generate ios/android native projects (config plugin resolution)
	$(EXPO) prebuild

prebuild-ios: ## Prebuild only iOS
	$(EXPO) prebuild -p ios

prebuild-android: ## Prebuild only Android
	$(EXPO) prebuild -p android

# --- Code quality ---
lint: ## Lint with ESLint
	$(ESLINT) . --ext .ts,.tsx

fix: ## Auto-fix ESLint issues
	$(ESLINT) . --ext .ts,.tsx --fix

format: ## Format with Prettier
	$(PRETTIER) --write .

typecheck: ## Type-check with TypeScript (no emit)
	$(TSC) --noEmit

test: ## Run tests (Jest)
	$(JEST)

# --- EAS (builds, submit, OTA updates) ---
login-eas: ## Log in to EAS
	$(EAS) login

build-android: ## EAS build Android (profile=$(EAS_PROFILE))
	$(EAS) build -p android --profile $(EAS_PROFILE)

build-ios: ## EAS build iOS (profile=$(EAS_PROFILE))
	$(EAS) build -p ios --profile $(EAS_PROFILE)

submit-android: ## Submit most recent Android build to store
	$(EAS) submit -p android --latest

submit-ios: ## Submit most recent iOS build to store
	$(EAS) submit -p ios --latest

publish: ## OTA update via EAS Update (branch=$(EAS_BRANCH))
	$(EAS) update --branch $(EAS_BRANCH) --message "OTA update"
