import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const cleanTailwindPreflightDiagnostics = {
  postcssPlugin: 'clean-tailwind-preflight-diagnostics',
  Once(root) {
    root.walkDecls('-webkit-appearance', (decl) => {
      const hasStandardAppearance = decl.parent?.nodes?.some(
        (node) => node.type === 'decl' && node.prop === 'appearance',
      );

      if (!hasStandardAppearance) {
        decl.cloneAfter({ prop: 'appearance' });
      }
    });

    root.walkRules((rule) => {
      const selectors = rule.selector.split(',').map((selector) => selector.trim());
      const mediaResetSelectors = ['img', 'svg', 'video', 'canvas', 'audio', 'iframe', 'embed', 'object'];
      const isMediaReset =
        mediaResetSelectors.every((selector) => selectors.includes(selector)) &&
        rule.nodes?.some((node) => node.type === 'decl' && node.prop === 'display' && node.value === 'block');

      if (isMediaReset) {
        rule.walkDecls('vertical-align', (decl) => decl.remove());
      }
    });
  },
};

export default {
  plugins: [tailwindcss, autoprefixer, cleanTailwindPreflightDiagnostics],
};
