import tsConfig from './tsconfig.json';
import tsConfigPaths from 'tsconfig-paths'

const { baseUrl, outDir, paths } = tsConfig.compilerOptions;

const outDirPaths = Object.entries(paths).reduce(
  (outDirPaths, [k, v]) => Object.assign(
    outDirPaths,
    { [k]: v.map(path => path.replace(/^src\//, `${outDir}/`)) }
  ),
  {}
);

tsConfigPaths.register({ baseUrl, paths: outDirPaths });