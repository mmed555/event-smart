import { describe, it, expect } from 'vitest';
import { screenToPath, pathToScreen } from '../context/AppContext';

describe('Router & Screen Navigation Utilities', () => {
  it('correctly maps screen IDs to paths', () => {
    expect(screenToPath('landing')).toBe('/');
    expect(screenToPath('auth')).toBe('/auth');
    expect(screenToPath('ai')).toBe('/ai');
    expect(screenToPath('search')).toBe('/search');
    expect(screenToPath('details', { id: 2 })).toBe('/events/2');
    expect(screenToPath('speaker', { speakerId: 'sp-1' })).toBe('/speaker/sp-1');
  });

  it('correctly maps paths to screen IDs', () => {
    expect(pathToScreen('/').screen).toBe('landing');
    expect(pathToScreen('/auth').screen).toBe('auth');
    expect(pathToScreen('/events/5').screen).toBe('details');
    expect(pathToScreen('/events/5').params?.id).toBe(5);
    expect(pathToScreen('/admin/users').screen).toBe('admin');
    expect(pathToScreen('/admin/users').adminTab).toBe('users');
    expect(pathToScreen('/vendor/rfq-inbox').screen).toBe('vendor');
    expect(pathToScreen('/vendor/rfq-inbox').vendorTab).toBe('rfq-inbox');
    expect(pathToScreen('/organizer/checkin').screen).toBe('org');
    expect(pathToScreen('/organizer/checkin').orgTab).toBe('checkin');
  });
});
