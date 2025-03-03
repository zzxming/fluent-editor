import packageJson from '@opentiny/fluent-editor/package.json'

export function inertDepsVersion() {
  if (typeof document === 'undefined') return

  const {
    npm_package_devDependencies_vite: ViteVersion,
    npm_package_devDependencies_vitepress: VitePressVersion,
    npm_package_dependencies_vue: VueVersion,
    npm_package_dependencies_quill: QuillVersion,
  } = process.env
  const FluentEditorVersion = packageJson.version

  document.body.setAttribute('data-vite-version', ViteVersion || 'dev')
  document.body.setAttribute('data-vitepress-version', VitePressVersion || 'dev')
  document.body.setAttribute('data-vue-version', VueVersion || 'dev')
  document.body.setAttribute('data-quill-version', QuillVersion || 'dev')
  document.body.setAttribute('data-fluent-editor-version', FluentEditorVersion)
}
