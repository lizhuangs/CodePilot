import { NextResponse } from 'next/server';
import { execFile, execFileSync } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import path from 'path';

const execFileAsync = promisify(execFile);

function getExpandedPath(): string {
  const home = os.homedir();
  const extra = [
    '/usr/local/bin',
    '/opt/homebrew/bin',
    '/usr/bin',
    '/bin',
    path.join(home, '.npm-global', 'bin'),
    path.join(home, '.nvm', 'current', 'bin'),
    path.join(home, '.local', 'bin'),
    path.join(home, '.claude', 'bin'),
  ];
  const current = process.env.PATH || '';
  const parts = current.split(':');
  for (const p of extra) {
    if (!parts.includes(p)) parts.push(p);
  }
  return parts.join(':');
}

function findClaudePath(): string | null {
  const home = os.homedir();
  const candidates = [
    '/usr/local/bin/claude',
    '/opt/homebrew/bin/claude',
    path.join(home, '.npm-global', 'bin', 'claude'),
    path.join(home, '.local', 'bin', 'claude'),
    path.join(home, '.claude', 'bin', 'claude'),
  ];

  for (const p of candidates) {
    try {
      execFileSync(p, ['--version'], { timeout: 3000, stdio: 'pipe' });
      return p;
    } catch {
      // not found, try next
    }
  }

  // Fallback: use `which claude` with expanded PATH
  try {
    const result = execFileSync('/usr/bin/which', ['claude'], {
      timeout: 3000,
      stdio: 'pipe',
      env: { ...process.env, PATH: getExpandedPath() },
    });
    return result.toString().trim() || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const claudePath = findClaudePath();
    if (!claudePath) {
      return NextResponse.json({ connected: false, version: null });
    }

    const { stdout } = await execFileAsync(claudePath, ['--version'], {
      timeout: 5000,
      env: { ...process.env, PATH: getExpandedPath() },
    });
    const version = stdout.trim();
    return NextResponse.json({ connected: true, version });
  } catch {
    return NextResponse.json({ connected: false, version: null });
  }
}
