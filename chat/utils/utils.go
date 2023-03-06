package utils

// Merge method takes two slices of any type T and returns a new slice that contains all the elements of the input slices
// in the same order. It first creates a new slice with a length equal to the sum of the lengths of the input slices.
// Then it copies the elements of the first slice to the beginning of the new slice and the elements of the second
// slice to the end of the new slice. Finally, it returns the new slice.
func Merge[T any](first, second []T) []T {
	// Create first new slice with length equal to the sum of the lengths of first and second
	list := make([]T, len(first)+len(second))
	// Copy elements from slice first to the beginning of the new slice
	copy(list, first)
	// Copy elements from slice second to the end of the new slice
	copy(list[len(first):], second)
	// Return the new slice
	return list
}
