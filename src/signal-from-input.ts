import { Signal, signal, WritableSignal } from '@angular/core';

export const fromInput =
    <T>(target: T) =>
    <K extends keyof T>(name: K): Signal<T[K] | undefined> => {
        let current: T[K];
        let _signal: WritableSignal<T[K]>;

        if (target[name] !== undefined) {
            _signal = signal<T[K]>(target[name]);
        } else {
            _signal = signal<T[K]>(undefined as T[K]);
        }

        Object.defineProperty(target, name, {
            set(value: T[K]) {
                current = value;
                _signal.set(value);
            },
            get() {
                return current;
            },
        });

        return _signal.asReadonly();
    };
