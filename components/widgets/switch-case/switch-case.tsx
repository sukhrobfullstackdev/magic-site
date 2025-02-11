// https://github.com/toss/slash/blob/main/packages/react/react/src/components/SwitchCase/SwitchCase.tsx

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value: Case;
  defaultComponent?: JSX.Element | null;
}

export function SwitchCase<Case extends string | number>({ value, caseBy, defaultComponent = null }: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
