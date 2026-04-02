#фильтры

"""from django.db.models import Q, IntegerField, Value, Case, When, F
from .models import Price

def Get_price(product_id: int, grade_id=None, surface_id=None, width_id=None):
    qs = Price.objects.filter(product_id=product_id)

    qs = qs.filter(
        Q(grade_id=grade_id) | Q(grade__isnull=True),
        Q(surface_id=surface_id) | Q(surface__isnull=True),
        Q(width_id=width_id) | Q(width__isnull=True),
    )

    qs = qs.annotate(
        specificity=(
                Case(When(grade__isnull=False, then=Value(1)), default=Value(0), output_field=IntegerField()) +
                Case(When(surface__isnull=False, then=Value(1)), default=Value(0), output_field=IntegerField()) +
                Case(When(width__isnull=False, then=Value(1)), default=Value(0), output_field=IntegerField())
        )
    ).order_by("-specificity", "-updated_at")

    return qs.first()"""