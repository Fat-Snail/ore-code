import { describe, expect, it } from "vitest";
import {
  AppSettingsSchema,
  defaultAppSettings,
  normalizeAppSettings
} from "./appSettings";

describe("AppSettingsSchema", () => {
  it("fills stable desktop defaults", () => {
    expect(defaultAppSettings).toEqual({
      mode: "agent",
      permissionPreset: "default",
      includeIdeContext: false,
      enableCacheWarmup: false,
      themePreference: "system",
      localePreference: "system",
      workspacePath: ".",
      workspacePaths: [],
      disabledSkillIds: []
    });
  });

  it("does not preserve api keys in app settings", () => {
    const settings = AppSettingsSchema.parse({
      provider: "deepseek",
      deepSeekApiKey: "sk-test"
    });

    expect(settings).not.toHaveProperty("deepSeekApiKey");
  });

  it("normalizes persisted UI locale preferences", () => {
    const settings = normalizeAppSettings(AppSettingsSchema.parse({
      localePreference: "en-US"
    }));

    expect(settings.localePreference).toBe("en-US");
  });
});
