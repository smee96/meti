import { Hono } from 'hono';
import type { Env } from '../types';
import { landingPageHTMLWithVersions } from './landing-page-html';

const landing = new Hono<{ Bindings: Env }>();

landing.get('/', (c) => {
  return c.html(landingPageHTMLWithVersions);
});

export default landing;
