import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores, raio, sombra } from '../constants/theme';

type ToastType = 'success' | 'error' | 'info';

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(
    null
  );

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const icon =
    toast?.type === 'success'
      ? 'checkmark-circle'
      : toast?.type === 'error'
        ? 'alert-circle'
        : 'information-circle';

  const iconColor =
    toast?.type === 'success'
      ? cores.sucesso
      : toast?.type === 'error'
        ? cores.erro
        : cores.primary;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast ? (
        <View style={[styles.wrap, { bottom: insets.bottom + 88 }]} pointerEvents="none">
          <View style={styles.toast}>
            <Ionicons name={icon} size={22} color={iconColor} />
            <Text style={styles.text}>{toast.message}</Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: cores.fundoCard,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
    maxWidth: '100%',
    ...sombra.card,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
  },
});
