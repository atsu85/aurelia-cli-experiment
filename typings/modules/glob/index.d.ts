// Generated by typings
// Source: https://raw.githubusercontent.com/typed-typings/npm-minimatch/74f47de8acb42d668491987fc6bc144e7d9aa891/minimatch.d.ts
declare module '~glob~minimatch/minimatch' {
function minimatch (target: string, pattern: string, options?: minimatch.Options): boolean;

namespace minimatch {
	export function match (list: string[], pattern: string, options?: Options): string[];
	export function filter (pattern: string, options?: Options): (element: string, indexed: number, array: string[]) => boolean;
	export function makeRe (pattern: string, options?: Options): RegExp;

  /**
   * All options are `false` by default.
   */
	export interface Options {
    /**
     * Dump a ton of stuff to stderr.
     */
		debug?: boolean;
    /**
     * Do not expand `{a,b}` and `{1..3}` brace sets.
     */
		nobrace?: boolean;
    /**
     * Disable `**` matching against multiple folder names.
     */
		noglobstar?: boolean;
    /**
     * Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot.
     *
     * Note that by default, `a\/**\/b` will not match `a/.d/b`, unless `dot` is set.
     */
		dot?: boolean;
    /**
     * Disable "extglob" style patterns like `+(a|b)`.
     */
		noext?: boolean;
    /**
     * Perform a case-insensitive match.
     */
		nocase?: boolean;
    /**
     * When a match is not found by `minimatch.match`, return a list containing the pattern itself if this option is set. When not set, an empty list is returned if there are no matches.
     */
		nonull?: boolean;
    /**
     * If set, then patterns without slashes will be matched against the basename of the path if it contains slashes. For example, `a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.
     */
		matchBase?: boolean;
    /**
     * Suppress the behavior of treating `#` at the start of a pattern as a comment.
     */
		nocomment?: boolean;
    /**
     * Suppress the behavior of treating a leading `!` character as negation.
     */
		nonegate?: boolean;
    /**
     * Returns from negate expressions the same as if they were not negated. (Ie, true on a hit, false on a miss.)
     */
		flipNegate?: boolean;
	}

	export class Minimatch {
		constructor (pattern: string, options?: Options);

    /**
     * The original pattern the minimatch object represents.
     */
    pattern: string;
    /**
     * The options supplied to the constructor.
     */
		options: Options;

    /**
     * Created by the `makeRe` method. A single regular expression expressing the entire pattern. This is useful in cases where you wish to use the pattern somewhat like `fnmatch(3)` with `FNM_PATH` enabled.
     */
		regexp: RegExp;
    /**
     * True if the pattern is negated.
     */
		negate: boolean;
    /**
     * True if the pattern is a comment.
     */
		comment: boolean;
    /**
     * True if the pattern is `""`.
     */
		empty: boolean;

    /**
     * Generate the regexp member if necessary, and return it. Will return false if the pattern is invalid.
     */
		makeRe (): RegExp | boolean;
    /**
     * Return true if the filename matches the pattern, or false otherwise.
     */
		match (fname: string): boolean;
    /**
     * Take a `/-`split filename, and match it against a single row in the `regExpSet`. This method is mainly for internal use, but is exposed so that it can be used by a glob-walker that needs to avoid excessive filesystem calls.
     */
		matchOne (fileArray: string[], patternArray: string[], partial: boolean): boolean;
	}
}

export = minimatch;
}
declare module '~glob~minimatch' {
import main = require('~glob~minimatch/minimatch');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/typed-typings/npm-glob/59ca0f5d4696a8d4da27858035316c1014133fcb/glob.d.ts
declare module '~glob/glob' {
import events = require('events');
import fs = require('fs');
import minimatch = require('~glob~minimatch');

function glob (pattern: string, cb: (err: Error, matches: string[]) => void): void;
function glob (pattern: string, options: glob.Options, cb: (err: Error, matches: string[]) => void): void;

namespace glob {
  export function sync (pattern: string, options?: Options): string[];
  export function hasMagic (pattern: string, options?: Options): boolean;

  export interface Cache {
    [path: string]: boolean | string | string[];
  }

  export interface StatCache {
    [path: string]: fs.Stats;
  }

  export interface Symlinks {
    [path: string]: boolean;
  }

  export interface Options extends minimatch.Options {
    /**
     * The current working directory in which to search. Defaults to `process.cwd()`.
     */
    cwd?: string;
    /**
     * The place where patterns starting with `/` will be mounted onto. Defaults to `path.resolve(options.cwd, "/")` (`/` on Unix systems, and `C:\` or some such on Windows.)
     */
    root?: string;
    /**
     * Include `.dot` files in normal matches and `globstar` matches. Note that an explicit dot in a portion of the pattern will always match dot files.
     */
    dot?: boolean;
    /**
     * By default, a pattern starting with a forward-slash will be "mounted" onto the root setting, so that a valid filesystem path is returned. Set this flag to disable that behavior.
     */
    nomount?: boolean;
    /**
     * Add a `/` character to directory matches. Note that this requires additional stat calls.
     */
    mark?: boolean;
    /**
     * Don't sort the results.
     */
    nosort?: boolean;
    /**
     * Set to true to stat all results. This reduces performance somewhat, and is completely unnecessary, unless `readdir` is presumed to be an untrustworthy indicator of file existence.
     */
    stat?: boolean;
    /**
     * When an unusual error is encountered when attempting to read a directory, a warning will be printed to stderr. Set the `silent` option to true to suppress these warnings.
     */
    silent?: boolean;
    /**
     * When an unusual error is encountered when attempting to read a directory, the process will just continue on in search of other matches. Set the `strict` option to raise an error in these cases.
     */
    strict?: boolean;
    /**
     * See `cache` property above. Pass in a previously generated cache object to save some fs calls.
     */
    cache?: Cache;
    /**
     * A cache of results of filesystem information, to prevent unnecessary stat calls. While it should not normally be necessary to set this, you may pass the statCache from one glob() call to the options object of another, if you know that the filesystem will not change between calls. (See https://github.com/isaacs/node-glob#race-conditions)
     */
    statCache?: StatCache;
    /**
     * A cache of known symbolic links. You may pass in a previously generated `symlinks` object to save lstat calls when resolving `**` matches.
     */
    symlinks?: Symlinks;
    /**
     * DEPRECATED: use `glob.sync(pattern, opts)` instead.
     */
    sync?: boolean;
    /**
     * In some cases, brace-expanded patterns can result in the same file showing up multiple times in the result set. By default, this implementation prevents duplicates in the result set. Set this flag to disable that behavior.
     */
    nounique?: boolean;
    /**
     * Set to never return an empty set, instead returning a set containing the pattern itself. This is the default in glob(3).
     */
    nonull?: boolean;
    /**
     * Set to enable debug logging in minimatch and glob.
     */
    debug?: boolean;
    /**
     * Do not expand `{a,b}` and `{1..3}` brace sets.
     */
    nobrace?: boolean;
    /**
     * Do not match `**` against multiple filenames. (Ie, treat it as a normal `*` instead.)
     */
    noglobstar?: boolean;
    /**
     * Do not match `+(a|b)` "extglob" patterns.
     */
    noext?: boolean;
    /**
     * Perform a case-insensitive match. Note: on case-insensitive filesystems, non-magic patterns will match by default, since `stat` and `readdir` will not raise errors.
     */
    nocase?: boolean;
    /**
     * Perform a basename-only match if the pattern does not contain any slash characters. That is, `*.js` would be treated as equivalent to `**\/*.js`, matching all js files in all directories.
     */
    matchBase?: any;
    /**
     * Do not match directories, only files. (Note: to match only directories, simply put a `/` at the end of the pattern.)
     */
    nodir?: boolean;
    /**
     * Add a pattern or an array of glob patterns to exclude matches. Note: `ignore` patterns are always in `dot:true` mode, regardless of any other settings.
     */
    ignore?: string | string[];
    /**
     * Follow symlinked directories when expanding `**` patterns. Note that this can result in a lot of duplicate references in the presence of cyclic links.
     */
    follow?: boolean;
    /**
     * Set to true to call `fs.realpath` on all of the results. In the case of a symlink that cannot be resolved, the full absolute path to the matched entry is returned (though it will usually be a broken symlink)
     */
    realpath?: boolean;
  }

  export class Glob extends events.EventEmitter {
    constructor (pattern: string, cb?: (err: Error, matches: string[]) => void);
    constructor (pattern: string, options: Options, cb?: (err: Error, matches: string[]) => void);

    /**
     * The minimatch object that the glob uses.
     */
    minimatch: minimatch.Minimatch;
    /**
     * The options object passed in.
     */
    options: Options;
    /**
     * Boolean which is set to true when calling `abort()`. There is no way at this time to continue a glob search after aborting, but you can re-use the statCache to avoid having to duplicate syscalls.
     * @type {boolean}
     */
    aborted: boolean;
    /**
     * Convenience object.
     */
    cache: Cache;
    /**
     * Cache of `fs.stat` results, to prevent statting the same path multiple times.
     */
    statCache: StatCache;
    /**
     * A record of which paths are symbolic links, which is relevant in resolving `**` patterns.
     */
    symlinks: Symlinks;
    /**
     * An optional object which is passed to `fs.realpath` to minimize unnecessary syscalls. It is stored on the instantiated Glob object, and may be re-used.
     */
    realpathCache: { [path: string]: string };
    found: string[];

    /**
     * Temporarily stop the search.
     */
    pause(): void;
    /**
     * Resume the search.
     */
    resume(): void;
    /**
     * Stop the search forever.
     */
    abort(): void;
  }
}

export = glob;
}
declare module 'glob/glob' {
import main = require('~glob/glob');
export = main;
}
declare module 'glob' {
import main = require('~glob/glob');
export = main;
}
