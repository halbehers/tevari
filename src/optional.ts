import {
  Function1,
  Predicate,
  Consumer,
  Supplier,
  Function2,
} from "./functions";
import { NoSuchElementException } from "./exceptions";

/**
 * A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
 * Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present).
 *
 * This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.
 */
export class Optional<T> {
  private constructor(private value?: T) {}

  /**
   * Returns an empty Optional instance.
   */
  public static empty<T>() {
    return new Optional<T>();
  }

  /**
   * Returns an Optional with the specified present non-null value.
   *
   * @param value The value to fill the Optional with.
   * @returns  an Optional with the given value.
   */
  public static filled<T>(value: T) {
    return new Optional<T>(value);
  }

  /**
   * Returns an Optional with the specified present value if non-null, otherwise returns an empty Optional.
   *
   * @param value The value to fill the Optional with.
   * @returns an Optional with the given value if non-null, an empty Optional otherwise.
   */
  public static of<T>(value?: T) {
    if (value === undefined || value === null) return Optional.empty<T>();

    return new Optional<T>(value as T);
  }

  /**
   * Indicates whether some other object is "equal to" this Optional.
   *
   * @param other Object to compare this optional value with.
   * @param comparator The predicate used to compare the values.
   * @returns `true`if the two values are equal, `false` otherwise.
   */
  public equals(other: T, comparator?: Function2<T, T, boolean>): boolean {
    if (this.isEmpty()) return false;
    if (comparator) return comparator(this.value as T, other);

    return this.value === other;
  }

  /**
   * Casts this Optional to the given type.
   *
   * @returns a new optional typed as the given type.
   */
  public as<U>(): Optional<U> {
    return Optional.of<U>(this.value as U);
  }

  /**
   * Sets the given value. If a value is already present, this method replaces it.
   *
   * @param value The value to set.
   */
  public set(value: T) {
    this.value = value;
    return this;
  }

  /**
   * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
   *
   * @returns the value if present, throws NoSuchElementException otherwise.
   */
  public get() {
    if (this.isEmpty())
      throw new NoSuchElementException(
        "[Optional] You are trying to get an empty value."
      );

    return this.value as T;
  }

  /**
   * If a value is present, and the value matches the given predicate, return an Optional describing the value, otherwise return an empty Optional.
   *
   * @param predicate To filter the value with if present.
   * @returns a filled Optional if a value is present and it matches the given predicate, and emlpty Optional otherwise.
   */
  public filter(predicate: Predicate<T>): Optional<T> {
    if (this.isEmpty() || !predicate(this.value as T)) return Optional.empty();

    return Optional.of(this.value);
  }

  /**
   * If a value is present, apply the provided mapping function to it, and if the result is non-null, return an Optional describing the result.
   *
   * @param mapper The mapper function.
   * @returns the result Optional if a value is present, an empty Optional otherwise.
   */
  public map<U>(mapper: Function1<T, U>): Optional<U> {
    if (this.isEmpty()) return Optional.empty();

    return Optional.of(mapper(this.value as T));
  }

  /**
   * If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise return an empty Optional.
   *
   * @param mapper The mapper function.
   * @returns the result Optional if a value is present, an empty Optional otherwise.
   */
  public flatMap<U>(mapper: Function1<T, Optional<U>>): Optional<U> {
    if (this.isEmpty()) return Optional.empty();

    return mapper(this.value as T);
  }

  /**
   * Tests whether this optional is empty.
   *
   * @returns `true` if there is no present value, otherwise `false`.
   */
  public isEmpty(): boolean {
    if (this.value === undefined || this.value === null) return true;

    return false;
  }

  /**
   * Tests whether a value is present.
   *
   * @returns `true` if there is a value present, otherwise `false`.
   */
  public isPresent(): boolean {
    if (this.isEmpty()) return false;

    return true;
  }

  /**
   * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
   *
   * @param consumer The consumer to invoke if a value is present.
   */
  public ifPresent(consumer: Consumer<T>): void {
    if (!this.value) return;

    consumer(this.value);
  }

  /**
   * Return the value if present, otherwise return other.
   *
   * @param other The default value to return if this Optional is empty.
   * @returns the value if present, otherwise `other`.
   */
  public orElse(other: T): T {
    if (this.isEmpty()) return other;

    return this.value as T;
  }

  /**
   * Return the value if present, otherwise return `undefined`.
   *
   * @returns the value if present, otherwise `undefined`.
   */
  public orUndefined(): T | undefined {
    if (this.isEmpty()) return undefined;

    return this.value as T;
  }

  /**
   * Return the value if present, otherwise return `null`.
   *
   * @returns the value if present, otherwise `null`.
   */
  public orNull(): T | null {
    if (this.isEmpty()) return null;

    return this.value as T;
  }

  /**
   * Return the value if present, otherwise invoke other and return the result of that invocation.
   *
   * @param supplier The supplier to invoke when the value is not present.
   * @returns either the value if present, the result of the given supplier otherwise.
   */
  public orElseGet(supplier: Supplier<T>): T {
    if (this.isEmpty()) return supplier();

    return this.value as T;
  }

  /**
   * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
   *
   * @param exceptionSupplier
   * @returns
   */
  public orElseThrow<U extends Error>(exceptionSupplier: Supplier<U>): T {
    if (this.isEmpty()) throw exceptionSupplier();

    return this.value as T;
  }

  /**
   * If a value is present, apply the provided resolver function to it, and if the result is non-null, return an Optional describing the result.
   *
   * @param resolver The resolver function.
   * @param other The value to return if the Optional is empty.
   * @returns the result Optional if a value is present, the given `other` parameter otherwise.
   */
  public resolve<U>(resolver: Function1<T, U>, other: U): U {
    if (this.isEmpty()) return other;

    return resolver(this.value as T);
  }
}
