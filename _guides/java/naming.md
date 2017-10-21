Package names are in lower case.

File names of classes reflect the class name including the capital first letter.
For example the class `Vanilla` needs to be contained in file `Vanilla.java`.

Tests match their production code file names with a `Test` suffix, e.g. tests for code in `Vanilla.java` should be written in `VanillaTest.java`.

They also match their production package, so that class `com.vanilla_project.Vanilla` will have its tests in `com.vanilla_project.VanillaTest`.
While the package names match, the physical location does not (as they're separated by `src/main` and `src/test`).
