'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { notification } from '@/helpers/notificaciones';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      notification('Todos los campos son obligatorios', 'error');
      return;
    }

    const success = login(form.email, form.password);
    
    if (success) {
      notification('Inicio de sesión exitoso', 'success');
      router.push('/dashboard');
    } else {
      notification('Credenciales incorrectas', 'error');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Ingresar
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta? <Link href="/register" className="text-blue-600 hover:underline">Regístrate</Link>
        </p>
      </form>
    </main>
  );
}
