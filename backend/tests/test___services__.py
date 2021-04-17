from unittest import TestCase

from backend.services import convertLatexToStandard


class Test(TestCase):
    def test_convert_latex_to_standard(self):
        self.assertEqual(convertLatexToStandard(r'x^2'), 'x**2')

        self.assertEqual(convertLatexToStandard(r'x^2+3x+(x)(y)'), 'x**2+3*x+(x)*(y)')
        self.fail()
