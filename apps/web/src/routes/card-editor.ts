import { Hono } from 'hono';
import type { Env } from '../types';
import { getEditorHTML } from '../templates/card/editor-template';

const cardEditor = new Hono<{ Bindings: Env }>();

// Card editor page (new card)
cardEditor.get('/new', (c) => {
  return c.html(getEditorHTML('new', null));
});

// Card editor page (edit existing)
cardEditor.get('/:id/edit', async (c) => {
  const cardId = c.req.param('id');
  return c.html(getEditorHTML('edit', cardId));
});

export default cardEditor;
