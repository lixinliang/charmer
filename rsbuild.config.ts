import {
  defineConfig,
  mergeRsbuildConfig,
  type RsbuildConfig,
} from '@rsbuild/core'
import SimpleGit from 'simple-git'
import pkg from './package.json'

enum Mode {
  Index = 'index',
  Main = 'main',
  View = 'view',
}

const Entry: Record<Mode, string> = {
  [Mode.Index]: './entry/index.ts',
  [Mode.Main]: './entry/main.ts',
  [Mode.View]: './entry/view.ts',
}

const createMeta = (data: Record<string, string>) => new URLSearchParams(data).toString().replace(/&/g, ',')

export default defineConfig(async () => {
  const git = SimpleGit()

  const hash = await git.revparse(['HEAD'])
  
  const baseConfig = defineConfig({
    source: {
      define: {
        HASH: `"${hash}"`,
        MODE: `"${process.env.MODE}`,
        VERSION: `"${pkg.version}"`,
        TIMESTAMP: `"${+new Date}"`,
      },
    },
    output: {
      distPath: {
        root: './dist',
      },
      filename: {
        'js': '[name].js',
        'css': '[name].css',
      },
      polyfill: 'off',
      cleanDistPath: false,
      legalComments: 'none',
    },
    performance: {
      chunkSplit: {
        strategy: 'all-in-one',
      },
    },
    html: {
      title: 'title',
      meta: {
        charset: {
          charset: 'UTF-8',
        },
        viewport: createMeta({
          'width': 'device-width',
          'initial-scale': '1.0',
          'user-scalable': '0',
          'minimum-scale': '1.0',
          'maximum-scale': '1.0',
        }),
      },
    },
  })
  
  const indexConfig = mergeRsbuildConfig(baseConfig, {
    source: {
      entry: {
        [Mode.Index]: Entry[Mode.Index],
      },
    },
    output: {
      inlineStyles: true,
      inlineScripts: true,
    },
    html: {
      meta: {
        'apple-mobile-web-app-title': pkg.name,
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'format-detection': createMeta({
          'email': 'no',
          'telephone': 'no',
        }),
      },
    },
  })
  
  const mainConfig = mergeRsbuildConfig(baseConfig, {
    source: {
      entry: {
        [Mode.Main]: Entry[Mode.Main],
      },
    },
  })
  
  const viewConfig = mergeRsbuildConfig(baseConfig, {
    source: {
      entry: {
        [Mode.View]: Entry[Mode.View],
      },
    },
  })
  
  const Config: Record<Mode, RsbuildConfig> = {
    [Mode.Index]: indexConfig,
    [Mode.Main]: mainConfig,
    [Mode.View]: viewConfig,
  }
  
  switch (process.env.MODE) {
    case Mode.Index:
      return Config[Mode.Index]
    case Mode.Main:
      return Config[Mode.Main]
    case Mode.View:
      return Config[Mode.View]
    default:
      return Config[Mode.Index]
  }
})
