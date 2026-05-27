import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';

type LtrTextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'dir'>;

export function LtrText<T extends ElementType = 'span'>({
  as,
  children,
  className,
  ...props
}: LtrTextProps<T>) {
  const Component = as ?? 'span';
  const classes = className ? `ltr-text ${className}` : 'ltr-text';

  return (
    <Component className={classes} dir="ltr" {...props}>
      {children}
    </Component>
  );
}
