import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import Contact from '@/pages/Contact';

const renderPage = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe('Contact', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the page and the artist email', () => {
    renderPage();
    expect(screen.getAllByText('paulodearaujo.arte@gmail.com').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Enviar Mensagem/i })).toBeInTheDocument();
  });

  it('posts the message to the FormSubmit endpoint and shows success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: 'true', message: 'sent' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderPage();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'maria@exemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Assunto/i), { target: { value: 'purchase' } });
    fireEvent.change(screen.getByLabelText(/Mensagem/i), {
      target: { value: 'Tenho interesse em uma obra.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://formsubmit.co/ajax/paulodearaujo.arte@gmail.com');
    const payload = JSON.parse(options.body);
    expect(payload).toMatchObject({
      Nome: 'Maria',
      Email: 'maria@exemplo.com',
      Assunto: 'Interesse em obra',
      Mensagem: 'Tenho interesse em uma obra.',
      _replyto: 'maria@exemplo.com',
    });

    expect(await screen.findByText('Mensagem enviada')).toBeInTheDocument();
  });

  it('shows the fallback channels when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    renderPage();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'maria@exemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Assunto/i), { target: { value: 'other' } });
    fireEvent.change(screen.getByLabelText(/Mensagem/i), { target: { value: 'Olá' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    expect(await screen.findByText('Não foi possível enviar')).toBeInTheDocument();
  });
});
