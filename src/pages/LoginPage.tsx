import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, remember }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onLogin();
        navigate('/');
      } else {
        setError(data.message || '登录失败');
      }
    } catch (err) {
      setError('网络错误');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">登录</h1>
              <p className="mt-2 text-sm text-muted-foreground">使用账号密码进入订阅管理系统</p>
            </div>

            <Form.Root onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Form.Field name="username">
                  <div className="space-y-2">
                    <Form.Label asChild>
                      <Label htmlFor="username">账号</Label>
                    </Form.Label>
                    <Form.Control asChild>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                        placeholder="请输入账号"
                        disabled={loading}
                      />
                    </Form.Control>
                  </div>
                </Form.Field>

                <Form.Field name="password">
                  <div className="space-y-2">
                    <Form.Label asChild>
                      <Label htmlFor="password">密码</Label>
                    </Form.Label>
                    <Form.Control asChild>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="请输入密码"
                        disabled={loading}
                      />
                    </Form.Control>
                  </div>
                </Form.Field>

                <div className="flex items-center justify-between">
                  <label htmlFor="remember" className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-primary"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="text-sm text-foreground">记住我</span>
                  </label>
                </div>

                {error && (
                  <div className="text-center text-sm text-destructive">{error}</div>
                )}

                <Form.Submit asChild>
                  <Button className="w-full" disabled={loading}>
                    {loading ? '登录中…' : '登录'}
                  </Button>
                </Form.Submit>
              </div>
            </Form.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
