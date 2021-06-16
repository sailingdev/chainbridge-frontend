function toFixed(num: Number, fixed: number) {
    if (!num) {
      return null;
    }
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return (<any>num).toString().match(re)[0];
  }
  
  export function computeCaps(n: number, decimals: number = 4) {
    if (typeof n !== 'number') {
      return (<any>n).toString();
    }
    n = n / 1000000000000000000;
    if (n < 1e4) {
      return Number(toFixed(n, decimals)).toString();
    }
    if (n < 1e6) {
      return Number(toFixed(n / 1e3, decimals)).toString() + 'k';
    }
    if (n < 1e9) {
      return Number(toFixed(n / 1e6, decimals)).toString() + 'M';
    }
    if (n < 1e12) {
      return Number(toFixed(n / 1e9, decimals)).toString() + 'G';
    }
    if (n < 1e15) {
      return Number(toFixed(n / 1e12, decimals)).toString() + 'T';
    }
    if (n < 1e18) {
      return Number(toFixed(n / 1e15, decimals)).toString() + 'P';
    }
    if (n < 1e21) {
      return Number(toFixed(n / 1e18, decimals)).toString() + 'E';
    }
    return Number(n).toString();
  }
  
  export function middleEllipsis(s: string, n: number = 10): string {
    if (s.length < n) return s;
    const start = s.slice(0, n / 2);
    const end = s.slice(-(n / 2));
    return start + '...' + end;
  }
  
  export function formatCaps(n: number): string {
    return new Intl.NumberFormat('en-US').format(n)
  }