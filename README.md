# signal-from-input

Small library that provides a typesafe extension to use angular component input fields as Signals

## Installation

```npm
npm i signal-from-input
```

Choose the version corresponding to your Angular version:

| Angular | @signal-from-input |
| ------- | ------------------ |
| 16+     | 16.x+              |

## Usage

Suppose you have the following component:

```typescript
@Component({
    selector: 'app-component',
    ...
})
export class AppComponent {
    @Input() showData: boolean;
    _data: Signal<Data>;

    constructor(private store: Store) {
        this._data = selectSignal(this.store.pipe(
            select(selectData)));
    }
}
```

In the constructor you want to connect the input to a signal.
To do this you can now use the function fromInput.
The signature of the function looks like this:

```typescript
fromInput: <T>(target: T) =>
    <K extends keyof T>(name: K) =>
        Signal<T[K] | undefined>;
```

The input can now be turned into a signal from the input field using the following call.

```typescript
fromInput<AppComponent>(this)('showData');
```

Here the complete example:

```typescript
import { fromInput } from 'signal-from-input';

@Component({
    selector: 'app-component',
    template: `
        <div *ngIf="showData">Input</div>
        <div *ngIf="_showData()">Input as signal</div>
    `,
})
export class AppComponent {
    @Input() showData: boolean;
    _showData: Signal<boolean>;
    _data: Signal<Data>;

    constructor(private store: Store) {
        this._showData = fromInput<AppComponent>(this)('showData');
        this._data = this.store.pipe(select(selectData));

        // now you can compute signals as you like
        this._computed = computed(() => this._showData ? this._data : ... );
    }
}
```
