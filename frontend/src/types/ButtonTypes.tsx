export type DefaultButtonProps = {
  variant:
    | 'primary'
    | 'secondary'
    | 'primary-secondary'
    | 'ternary'
    | 'ternary-secondary'
    | 'ternary-ternary'
    | 'ternary-quaternary';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  href?: string;
  children?: React.ReactNode;
  startIcon?: string | React.ReactElement;
  endIcon?: string | React.ReactElement;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: any;
  margin?: string;
  iconOnly?: boolean;
};

export type ButtonProps = {
  as: 'button';
  href?: never;
  target?: never;
  download?: never;
  onClick?: (e?: any) => void;
};

export type AnchorProps = {
  as: 'a';
  href: any;
  target?: '_blank';
  download?: boolean;
  onClick?: (e?: any) => void;
};

export type LinkTagProps = {
  as: 'Link';
  href: any;
  target?: never;
  download?: never;
  onClick?: (e?: any) => void;
};

export type AsProps = ButtonProps | AnchorProps | LinkTagProps;

export type ButtonTypes = DefaultButtonProps & AsProps;
