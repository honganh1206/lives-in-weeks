# Agent Instructions for Lives in Weeks

## Commands
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev**: `npm run dev` (uses Turbopack)
- **Test**: No test framework configured yet

## Code Style Guidelines
- **Components**: PascalCase, in `src/components/ComponentName/` folders with CSS modules
- **Imports**: Use `@/` alias for src, named React imports, CSS modules as `styles`
- **TypeScript**: Interfaces with `I` prefix, explicit prop typing, optional props with `?`
- **Naming**: camelCase variables/functions, PascalCase components/interfaces
- **Performance**: Use React.memo for expensive components, debounce for frequent operations
- **Hooks**: Custom hooks prefixed with `use`, in `src/hooks/` with `.hook.ts` suffix
- **Error Handling**: Add proper TypeScript types, handle async operations with try/catch
- **Comments**: Explain complex logic, especially around performance optimizations
- **Default Exports**: Components use default exports, utilities use named exports
- **URL State**: Use Next.js router hooks for URL parameter management

## Framework
- Next.js 15 with App Router, React 19, TypeScript 5, Radix UI components
