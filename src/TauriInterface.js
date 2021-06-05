import { Command } from "@tauri-apps/api/shell";

export function runCommand(launchable) {
  const command = new Command(launchable.cmd, launchable.args, {
    cwd: launchable.cwd,
  });
  command.spawn();
}
