import { Hono } from 'hono';
import type { Env } from '../types';
import { landingPageHTML } from './landing-page-html';

const landing = new Hono<{ Bindings: Env }>();

landing.get('/', (c) => {
  return c.html(landingPageHTML);
});

export default landing;
